DEMO_PATH = http://localhost:8082

typescript-types:
	rm -rf frontend/src/api_gen
	pnpm dlx @openapitools/openapi-generator-cli generate -i ${DEMO_PATH}/v3/api-docs  -g typescript-axios -o frontend/src/api_gen --additional-properties=withSeparateModelsAndApi=true,supportsES6=true,useSingleRequestParameter=true,apiPackage="apis",modelPackage="models"

be-dev:
	./mvnw spring-boot:run -Dspring-boot.run.profiles=local

be-prod:
	./mvnw spring-boot:run
