# FRONTEND

## General

Digitization of matriculation process of the Technische Hochschule Brandenburg

> This Repository hold the files for the Frontend

### Links to releated Gits

| Plugin | README |
| ------ | ------ |
| Backend | [github.com/pvb89/imma-backend][backend] |
| Camunda | [github.com/pvb89/imma-camunda][camunda] |

### Version information
| Purpose | Tool  | Version |
| ------ | ------ | ------ |
| Frontend | VueJS | 2.6.11 |
| Backend | Node | 13.0.1 |
| Database | MySQL | 8.0.19 |
| Process Automation | Camunda Engine | 7.12.0 |
| DMS | Codia D3 | Cloud Product |

## Deploy/Run:

#### Prerequisites

Install [Node with NPM][nodeDL] 

#### Install Packages
```
npm install
```

#### Compiles and minifies frontend for production
```
npm run build
```

#### Run frontend for development
```
npm run serve
```

#### Ports
```
Frontend: 3000
Server: 4000
Camunda: 8080
```

#### Open the frontend in a browser of your choice

[http://localhost:3000][srvURL]

 [backend]: <www.github.com/pvb89/imma-backend>
 [camunda]: <www.github.com/pvb89/imma-camunda>
 [nodeDL]: <https://nodejs.org/en/download/>
 [srvURL]: <http://localhost:3000>