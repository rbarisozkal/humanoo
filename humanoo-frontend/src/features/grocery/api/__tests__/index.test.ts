import axios from 'axios'
import { getAllGroceries, createGrocery, updateGrocery, deleteGrocery, filterGroceries } from '../index'
import { GroceryCreateRequest, GroceryUpdateRequest, GroceryFilters } from '../../types'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Grocery API', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getAllGroceries', () => {
        it('should call GET /api/groceries', async () => {
            const mockData = [{ id: 1, name: 'Apple', price: 2.99 }]
            mockedAxios.get.mockResolvedValue({ data: mockData })

            const result = await getAllGroceries()

            expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/groceries')
            expect(result).toEqual(mockData)
        })
    })

    describe('createGrocery', () => {
        it('should send POST request with correct data', async () => {
            const newGrocery: GroceryCreateRequest = {
                name: 'Banana',
                description: 'Yellow banana',
                price: 1.99,
                quantity: 10,
                category: 'FRUITS',
                unit: 'KG'
            }
            const mockResponse = { id: 2, ...newGrocery }
            mockedAxios.post.mockResolvedValue({ data: mockResponse })

            const result = await createGrocery(newGrocery)

            expect(mockedAxios.post).toHaveBeenCalledWith(
                'http://localhost:8080/api/groceries',
                newGrocery
            )
            expect(result).toEqual(mockResponse)
        })
    })

    describe('updateGrocery', () => {
        it('should send PUT request with correct data', async () => {
            const updateData: GroceryUpdateRequest = {
                name: 'Updated Apple',
                price: 3.49
            }
            const mockResponse = { id: 1, name: 'Updated Apple', price: 3.49 }
            mockedAxios.put.mockResolvedValue({ data: mockResponse })

            const result = await updateGrocery(1, updateData)

            expect(mockedAxios.put).toHaveBeenCalledWith(
                'http://localhost:8080/api/groceries/1',
                updateData
            )
            expect(result).toEqual(mockResponse)
        })
    })

    describe('deleteGrocery', () => {
        it('should send DELETE request to correct endpoint', async () => {
            mockedAxios.delete.mockResolvedValue({ data: undefined })

            await deleteGrocery(1)

            expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:8080/api/groceries/1')
        })
    })

    describe('filterGroceries', () => {
        it('should send GET request with filter parameters', async () => {
            const filters: GroceryFilters = {
                category: 'FRUITS',
                minPrice: 1.0,
                maxPrice: 5.0
            }
            const mockData = [{ id: 1, name: 'Apple', category: 'FRUITS' }]
            mockedAxios.get.mockResolvedValue({ data: mockData })

            const result = await filterGroceries(filters)

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:8080/api/groceries/filter?category=FRUITS&minPrice=1&maxPrice=5'
            )
            expect(result).toEqual(mockData)
        })

        it('should handle empty filters', async () => {
            const filters: GroceryFilters = {}
            const mockData: object[] = []
            mockedAxios.get.mockResolvedValue({ data: mockData })

            await filterGroceries(filters)

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'http://localhost:8080/api/groceries/filter?'
            )
        })
    })
}) 