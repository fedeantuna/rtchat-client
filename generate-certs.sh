#!/bin/bash
SILENT_PASSWORD="devcontainer"

if [ -z $1 ] || [ $1 = "--silent" ]; then
    MODE="silent"
elif [ $1 = "--prompt" ]; then
    MODE="prompt"
else
    echo "Invalid argument. Valid arguments are \"--prompt\" and \"--silent\""
    exit 1
fi

[ -d "./.certs" ] && rm -rf ./.certs && echo "Removed \".certs\" directory."

mkdir ./.certs
chmod 700 ./.certs
echo "Created \".certs\" directory."

mkdir ./.easyrsa
chmod 700 ./.easyrsa
echo "Created \".easyrsa\" directory."

cp -r /usr/share/easy-rsa/* ./.easyrsa/
echo "Copied easy-rsa files."

cd .easyrsa
./easyrsa init-pki
echo "easy-rsa PKI initialized."

cat << EOF > vars
set_var EASYRSA_REQ_COUNTRY    "AR"
set_var EASYRSA_REQ_PROVINCE   "Santa Fe"
set_var EASYRSA_REQ_CITY       "Rosario"
set_var EASYRSA_REQ_ORG        "Development"
set_var EASYRSA_REQ_EMAIL      "local@localhost.localdomain"
set_var EASYRSA_REQ_OU         "LocalDevelopment"
set_var EASYRSA_ALGO           "ec"
set_var EASYRSA_DIGEST         "sha512"
EOF
echo "vars file created."

export EASYRSA_BATCH=1
./easyrsa build-ca nopass
echo "CA created."

mkdir req
echo "\"req\" directory created."

cd req
openssl genrsa -out localhost.key
echo "\"localhost.key\" created."

openssl req -new -key localhost.key -out localhost.req -subj /C=AR/ST=Santa\ Fe/L=Rosario/O=Development/OU=LocalDevelopment/CN=localhost
echo "\"localhost.req\" created."

cd ..
./easyrsa import-req ./req/localhost.req localhost
./easyrsa sign-req server localhost
echo "localhost cert signed."

cp ./pki/ca.crt ../.certs/ca.crt
cp ./pki/issued/localhost.crt ../.certs/localhost.crt
cp ./req/localhost.key ../.certs/localhost.key
cd ../.certs
echo "Cert files copied to \".certs\" directory."

if [ $MODE = "silent" ]; then
    openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.crt -password pass:$SILENT_PASSWORD
else
    openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.crt
fi
echo "\"localhost.pfx\" created."

cd ..
rm -rf .easyrsa
echo "\".easyrsa\" deleted."

if [ $MODE = "silent" ]; then
    echo "The used password was \"$SILENT_PASSWORD\"."
fi