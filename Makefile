compose-dotenv:
	echo "DB_USER=${{ secrets.DB_USER }}" >> .env
	echo "DB_PASSWORD=${{ secrets.DB_PASSWORD }}" >> .env
	echo "DB_ADDRESS=${{ secrets.DB_ADDRESS }}" >> .env
	cat .env.example | grep "DB_URL" >> .env
	echo "PORT=${{ secrets.PORT }}" >> .env


.PHONY: compose-dotenv
