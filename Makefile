DEMO_PATH = http://localhost:8082

typescript-types:
	rm -rf frontend/src/api_gen
	pnpm dlx @openapitools/openapi-generator-cli generate -i ${DEMO_PATH}/v3/api-docs  -g typescript-axios -o frontend/src/api_gen --additional-properties=withSeparateModelsAndApi=true,supportsES6=true,useSingleRequestParameter=true,apiPackage="apis",modelPackage="models"

be-dev:
	./mvnw spring-boot:run	

build:
	. ~/.nvm/nvm.sh && nvm use && pnpm install --frozen-lockfile && pnpm run build && ./mvnw clean package


start:
	nohup java -jar target/progi.jar > output.log 2>&1 &

stop:
	kill -9 $(ps -ef | grep "java -jar target/progi.jar" | grep -v grep | awk '{print $2}')

