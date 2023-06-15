# REST

- RESTful HTTP API
- Representational State Transfer, aka REST
- Architectural style for building scalable web apps

URL           Verb            Functionality
"/notes"      GET             fetches all resources
"/notes/10"   GET             fetches a single resource
"/notes"      POST            create a new resource
"/notes/10"   DELETE          deletes a single resource
"/notes/10"   PUT             updates a single resource
"/notes/10/"  PATCH           replace a single resource

Status Codes
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found

500 Internal Server Error
504 Gateway Timeout