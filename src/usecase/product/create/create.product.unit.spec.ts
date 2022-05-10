import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product Name",
  price: 1.0
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute({
      name: input.name,
      price: input.price
    });

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(productCreateUseCase.execute({
      name: "",
      price: input.price
    })).rejects.toThrow(
      "product: Name is required"
    );
  });

  it("should thrown an error when price is zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(productCreateUseCase.execute({
      name: input.name,
      price: 0
    })).rejects.toThrow(
      "product: Price must be greater than zero"
    );
  });
});
