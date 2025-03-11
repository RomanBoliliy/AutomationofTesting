const { UserService, asyncHello, computeValue, asyncError, ApiClient, ApiHelper, calculateFinalPrice, OrderProcessor } = require('./labAssignment-lab4');

const fetch = require('node-fetch');
jest.mock('node-fetch', () => jest.fn());

describe('UserService', () => {
    test('greet calls getFullName and returns uppercase greeting', () => {
        const mockGetFullName = jest.fn().mockReturnValue("John Doe");
        const userService = new UserService(mockGetFullName);

        const result = userService.greet();
        expect(mockGetFullName).toHaveBeenCalledWith("John", "Doe");
        expect(result).toBe("HELLO, JOHN DOE!");
    });
});

describe('asyncHello', () => {
    test('resolves to "hello world"', async () => {
        await expect(asyncHello()).resolves.toBe("hello world");
    });
});

describe('computeValue', () => {
    test('returns 94', async () => {
        await expect(computeValue()).resolves.toBe(94);
    });
});

describe('asyncError', () => {
    test('rejects with "Something went wrong"', async () => {
        await expect(asyncError()).rejects.toThrow("Something went wrong");
    });
});

describe('ApiClient', () => {
    test('fetchData returns expected JSON with fetchedAt', async () => {
        const mockData = { key: "value" };
        fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(mockData) });

        const apiClient = new ApiClient();
        const result = await apiClient.fetchData();

        expect(result).toHaveProperty("key", "value");
        expect(result).toHaveProperty("fetchedAt");
        expect(typeof result.fetchedAt).toBe("number");
    });
});

describe('ApiHelper', () => {
    test('fetchViaHelper returns expected data', async () => {
        const mockData = { key: "value" };
        const mockApiCall = jest.fn().mockResolvedValue(mockData);

        const apiHelper = new ApiHelper();
        const result = await apiHelper.fetchViaHelper(mockApiCall);

        expect(result).toEqual(mockData);
    });
});

describe('calculateFinalPrice', () => {
    test('calculates correct price', () => {
        const order = {
            items: [{ price: 100, quantity: 2 }],
            taxRate: 0.1,
        };
        const mockDiscountService = { getDiscount: jest.fn().mockReturnValue(0.2) };

        const result = calculateFinalPrice(order, mockDiscountService);
        expect(result).toBe(216);
    });

    test('throws error for invalid order', () => {
        expect(() => calculateFinalPrice({}, null)).toThrow("Invalid order");
    });
});

describe('OrderProcessor', () => {
    test('processOrder converts currency', async () => {
        const mockConverter = jest.fn().mockResolvedValue(500);
        const orderProcessor = new OrderProcessor(mockConverter);
        const order = {
            items: [{ price: 100, quantity: 2 }],
            taxRate: 0.1,
            discountService: { getDiscount: () => 0.2 },
            currency: "USD",
        };
        const result = await orderProcessor.processOrder(order, "EUR");
        expect(result).toBe(500);
    });

    test('returns original price if conversion fails', async () => {
        const mockConverter = jest.fn().mockRejectedValue(new Error("Conversion failed"));
        const orderProcessor = new OrderProcessor(mockConverter);
        const order = {
            items: [{ price: 100, quantity: 2 }],
            taxRate: 0.1,
            discountService: { getDiscount: () => 0.2 },
            currency: "USD",
        };
        const result = await orderProcessor.processOrder(order, "EUR");
        expect(result).toBe(216);
    });
});
