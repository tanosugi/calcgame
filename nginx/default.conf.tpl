upstream django{
    server django:8001;
}

server {
    listen ${LISTEN_PORT};
    server_name 127.0.0.1;
    charset utf-8;


    location /static {
        alias /static;
    }

    location / {
        uwsgi_pass              django;
        include                 /etc/nginx/uwsgi_params;
        client_max_body_size    10M;
    }
}
