FROM python:3.9-alpine3.13
LABEL maintainer="Michal Kazmierczak"

ENV PYTHONUNBUFFERED 1

COPY ./requirements/* /tmp/requirements/
COPY ./backend /backend
WORKDIR /backend
EXPOSE 8000

ARG DEV=false
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /tmp/requirements/base.txt && \
    if [ $DEV = "true" ] ; \
        then echo "--DEV BUILD--" && /py/bin/pip install -r /tmp/requirements/dev.txt ; \
    fi && \
    rm -rf /tmp && \
    adduser \
        --disabled-password \
        --no-create-home \
        django-user

ENV PATH="/py/bin:$PATH"

USER django-user