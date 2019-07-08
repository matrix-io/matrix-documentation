FROM python:2.7

WORKDIR /volume

COPY requirements.txt /volume
RUN pip install --upgrade -r requirements.txt

EXPOSE 8000

CMD ["mkdocs", "serve"]
