def greet(name: str) -> None:
    """Greets the user with a friendly message."""
    print(f"Hello, {name}!")

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    greet(user_name)