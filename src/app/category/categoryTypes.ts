
export interface CategoryModelTypes {
    id: string,
    name: string,
    user: {
        id: string,
        name: string,
    },
    userId: string
}

export interface IFilterCategory {
    userId?: string,
}
