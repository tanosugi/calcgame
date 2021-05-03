FROM nginx:1.17

COPY ./default.conf.tpl /etc/nginx/default.conf.tpl
COPY ./uwsgi_params /etc/nginx/uwsgi_params
COPY ./static /static

ENV LISTEN_PORT=80
ENV APP_HOST=pandatch_django
ENV APP_PORT=8001

# USER root

RUN touch /etc/nginx/conf.d/default.conf
RUN chown nginx:nginx /etc/nginx/conf.d/default.conf

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# USER nginx

CMD ["/entrypoint.sh"]
