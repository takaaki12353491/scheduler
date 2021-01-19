mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE -e < "GRANT ALL on *.* to $MYSQL_USER@%;"
