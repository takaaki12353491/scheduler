mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE -e < "GRANT ALL on *.* to $MYSQL_USER@%;"

for FILE in `ls /docker-entrypoint-initdb.d/*.sql`; do
  mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE < ${FILE}
done