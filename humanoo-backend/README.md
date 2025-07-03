# Humanoo Grocery Management - Backend

A Spring Boot REST API for managing grocery inventory with comprehensive CRUD operations, search, and filtering capabilities.

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete grocery items
- **Search & Filter**: Search by name, filter by category, price range
- **Low Stock Alerts**: Identify items running low on inventory
- **Data Validation**: Input validation with detailed error messages
- **Clean Architecture**: Separated concerns with DTOs, services, and repositories
- **API Documentation**: Swagger/OpenAPI 3 integration
- **Sample Data**: Automatically seeded database for testing
- **Pagination**: Well, this also can be a feature, but it would also cost time so I skipped this task. But I must say that for this project, it is definitely a need.

## 🛠 Tech Stack

- **Java 17+**
- **Spring Boot 3.3.0**
- **Swagger**
- **Spring Data JPA**
- **Hibernate/JPA**
- **Maven**
- **Lombok** (for reducing boilerplate code)
- **Springdoc OpenAPI** (for API documentation)

## 📁 Project Structure

```
src/main/java/com/humanoo/grocery/
├── GroceryManagementApplication.java    # Main application class
├── config/
│   ├── DataSeeder.java                  # Database seeding
│   └── GlobalExceptionHandler.java      # Global error handling
├── controller/
│   └── GroceryController.java           # REST endpoints
├── dto/
│   ├── GroceryCreateRequest.java        # Create request DTO
│   ├── GroceryUpdateRequest.java        # Update request DTO
│   └── GroceryResponse.java             # Response DTO
├── model/
│   └── Grocery.java                     # JPA Entity
├── repository/
│   └── GroceryRepository.java           # Data access layer
└── service/
    └── GroceryService.java              # Business logic
```

## 🚦 Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Running the Application

1. **Clone the repository**

   ```bash
   git clone https://github.com/rbarisozkal/humanoo.git
   cd humanoo-backend
   ```

2. **Run the application**

   ```bash
   ./mvnw spring-boot:run
   ```

3. **Access the application**
   - API Base URL: `http://localhost:8080`
   - Swagger UI: `http://localhost:8080/swagger-ui.html`

### Running Tests

```bash
./mvnw test
```

### Building for Production

```bash
./mvnw clean package
java -jar target/grocery-management-0.0.1-SNAPSHOT.jar
```

## 📈 Key Design Decisions

### Simplified Architecture

- **Removed @Transactional annotations**: Keeping the code simple and avoiding over-engineering
- **Clean separation of concerns**: DTOs for API contracts, entities for persistence
- **Lombok integration**: Reducing boilerplate code with annotations

### Data Validation

- **Error handling**: Centralized exception handling with meaningful messages

### API Design

- **RESTful conventions**: Following HTTP standards and resource naming
- **Comprehensive search**: Multiple search and filter options
- **CORS enabled**: Ready for frontend integration

## 🧪 Testing

The application includes:

- **Unit tests**: Testing service layer logic
- **Integration tests**: Testing complete application context
- **API tests**: Testing REST endpoints (can be extended)

## 🚀 Future Enhancements

- Add pagination for large datasets
- Implement caching for frequently accessed data
- Add more sophisticated search with full-text capabilities
- Implement audit logging
- Add more comprehensive test coverage (unfortunately I have limited knowledge of QA :( )
