# AWS Production Setup for juniperbroz.net

## 1. Application Load Balancer Setup

### Create ALB:

- Name: `juniper-production-alb`
- Scheme: Internet-facing
- IP address type: IPv4
- VPC: Default VPC
- Subnets: Select 2+ availability zones

### Security Group for ALB:

- Name: `juniper-alb-sg`
- Inbound rules:
  - HTTP (80) from 0.0.0.0/0
  - HTTPS (443) from 0.0.0.0/0

## 2. Target Groups

### Frontend Target Group:

- Name: `juniper-frontend-tg`
- Protocol: HTTP, Port: 3000
- Health check: `/`
- Register EC2 instance

### Backend Target Group:

- Name: `juniper-backend-tg`
- Protocol: HTTP, Port: 8000
- Health check: `/api/`
- Register EC2 instance

## 3. SSL Certificate (ACM)

### Request Certificate:

- Domain: `juniperbroz.net`
- Domain: `www.juniperbroz.net`
- Validation: DNS

### DNS Validation Records (Add to InterServer):

```
Type: CNAME
Name: _acme-challenge.juniperbroz.net
Value: [ACM provided value]

Type: CNAME
Name: _acme-challenge.www.juniperbroz.net
Value: [ACM provided value]
```

## 4. Load Balancer Listeners

### HTTP Listener (Port 80):

- Action: Redirect to HTTPS
- Status: 301 Permanent Redirect
- Protocol: HTTPS, Port: 443

### HTTPS Listener (Port 443):

- Protocol: HTTPS
- SSL Certificate: Your ACM certificate
- Default action: Forward to `juniper-frontend-tg`

### HTTPS Listener Rules:

1. **API Rule:**

   - Condition: Path is `/api/*`
   - Action: Forward to `juniper-backend-tg`

2. **Default Rule:**
   - Action: Forward to `juniper-frontend-tg`

## 5. DNS Records at InterServer

After ALB is created, get the ALB DNS name and add these records:

```
Type: CNAME
Name: @
Value: [ALB DNS name]
TTL: 300

Type: CNAME
Name: www
Value: [ALB DNS name]
TTL: 300
```

## 6. EC2 Security Group Updates

Update your EC2 security group to allow ALB traffic:

```bash
# Allow ALB to reach frontend (port 3000)
aws ec2 authorize-security-group-ingress \
  --group-id [EC2-SECURITY-GROUP-ID] \
  --protocol tcp \
  --port 3000 \
  --source-group [ALB-SECURITY-GROUP-ID]

# Allow ALB to reach backend (port 8000)
aws ec2 authorize-security-group-ingress \
  --group-id [EC2-SECURITY-GROUP-ID] \
  --protocol tcp \
  --port 8000 \
  --source-group [ALB-SECURITY-GROUP-ID]
```

## 7. Health Check Endpoints

Ensure these endpoints respond correctly:

- Frontend: `http://EC2-IP:3000/` (should return React app)
- Backend: `http://EC2-IP:8000/api/` (should return {"message": "Hello World"})

## 8. Final Verification

After setup:

1. **Certificate Status:** Check ACM console - should show "Issued"
2. **Target Health:** Both target groups should show "Healthy"
3. **DNS Propagation:** Use `nslookup juniperbroz.net` to verify
4. **SSL Test:** Visit `https://www.juniperbroz.net` - should load with valid SSL

## 9. Monitoring Setup

### CloudWatch Alarms:

- ALB Target Response Time
- ALB HTTP 5XX errors
- Target Group Unhealthy Hosts

### Route 53 Health Checks (Optional):

- Monitor `https://www.juniperbroz.net`
- Monitor `https://www.juniperbroz.net/api/`

## Troubleshooting

### Common Issues:

1. **502 Bad Gateway:**

   - Check EC2 security groups allow ALB traffic
   - Verify applications are running on correct ports
   - Check target group health

2. **SSL Certificate Issues:**

   - Verify DNS validation records in InterServer
   - Wait for certificate validation (can take up to 30 minutes)

3. **DNS Not Resolving:**

   - Check CNAME records in InterServer
   - Wait for DNS propagation (up to 48 hours)

4. **API Calls Failing:**
   - Verify `/api/*` rule in ALB listener
   - Check backend target group health
   - Verify CORS settings in backend

## Cost Optimization

- Use Application Load Balancer (cheaper than Network LB for HTTP traffic)
- Consider Reserved Instances for EC2 if running 24/7
- Monitor CloudWatch costs and set up billing alerts

## Security Best Practices

- Keep EC2 security groups restrictive (only allow ALB traffic)
- Regularly update EC2 instance packages
- Use IAM roles instead of access keys where possible
- Enable AWS CloudTrail for audit logging
