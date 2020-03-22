# IP-Phisher

Plugins name says what it has to say about itself.
Why was it made? Because I can.
How to use it? However the fuck you want.

## How does it work?
It creates shorten URL. When victim visits this shorten URL it takes his IPv4 and redirects to another URL that you provide. Therefore, apps that preview links will render site from the redirection and victim won't notice anything suspicious.

### Requirements

- NodeJS (obviously..)

- Bit.ly API key 
https://dev.bitly.com/get_started.html

- ngrok
https://dashboard.ngrok.com/get-started

## Setup and execution

- `$ npm install`

- Create `.env` file in the root of the project with such variables:
    ```javascript
    BITLY_TOKEN=<your bit.ly api token>
    PORT=3000
    ```
- `npm start`
- open `ngrok`
- `$ ngrok http <port from .env>`

## API Documentation

- POST `/generate`
 
     | Body  |  |
    | ------------- | ------------- |
    | key  | Works as identifier  |
    | redirectUrl  | URL to be redirected to  |

    eg. Request: 
    ```javascript
    {
	"key": "testKey",
	"redirectUrl": "https://www.youtube.com/watch?v=1QyS-gkDWEQ"
    }
    ```
    
    Response: 
    ```javascript
    {
    "key": "testKey"
    "link": "https://bit.ly/398DJaH",
    }
    ```
    
- GET `/data`

    | Query |  |
    | ------------- | ------------- |
    | key  | Returns data only for this key  |
    
    eg. Request URL:
    `http://17591379.ngrok.io/data`
    
    Response:
    ```javascript
    {
        "testKey": {
            "redirectUrl": "https://www.youtube.com/watch?v=1QyS-gkDWEQ",
            "link": "https://bit.ly/2UaZEdd",
            "visits": [
                {
                    "time": "23.03.2020, 00:15:50",
                    "ip": "3.94.163.211"
                }
            ]
        },
        "lorem3301": {
            "redirectUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "link": "https://bit.ly/2U8YxLc",
            "visits": [
                {
                    "time": "23.03.2020, 00:17:57",
                    "ip": "3.94.163.211"
                }
            ]
        }
    }
    ```
    
    But for `http://17591379.ngrok.io/data?key=testKey` response will be such:
    
    ```javascript
    {
        "redirectUrl": "https://www.youtube.com/watch?v=1QyS-gkDWEQ",
        "link": "https://bit.ly/2UaZEdd",
        "visits": [
            {
                "time": "23.03.2020, 00:15:50",
                "ip": "3.94.163.211"
            }
        ]
    }
    ```
