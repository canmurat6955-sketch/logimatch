const createQueryBuilder = (table: string) => {
    const builder = {
        select: () => builder,
        eq: () => builder,
        neq: () => builder,
        gt: () => builder,
        lt: () => builder,
        gte: () => builder,
        lte: () => builder,
        like: () => builder,
        ilike: () => builder,
        is: () => builder,
        in: () => builder,
        contains: () => builder,
        order: () => builder,
        limit: () => builder,
        range: () => builder,
        upsert: () => ({
            data: { id: 'mock-user-id', role: 'admin' },
            error: null
        }),
        single: () => ({
            data: getMockData(table),
            error: null
        }),
        maybeSingle: () => ({
            data: getMockData(table),
            error: null
        }),
        then: (resolve: any) => resolve({ data: getMockData(table, true), error: null })
    };
    return builder;
};

export const createMockClient = () => {
    return {
        from: (table: string) => createQueryBuilder(table),
        auth: {
            getUser: async () => ({
                data: {
                    user: {
                        id: 'mock-user-id',
                        email: 'mock@example.com',
                        user_metadata: {
                            full_name: 'Mock User'
                        }
                    }
                },
                error: null
            }),
            getSession: async () => ({
                data: {
                    session: {
                        access_token: 'mock-token',
                        user: {
                            id: 'mock-user-id',
                            email: 'mock@example.com'
                        }
                    }
                },
                error: null
            }),
            signInWithPassword: async () => ({
                data: {
                    user: { id: 'mock-user-id' },
                    session: { access_token: 'mock-token' }
                },
                error: null
            }),
            signOut: async () => ({ error: null }),
            onAuthStateChange: () => ({
                data: { subscription: { unsubscribe: () => { } } }
            })
        }
    }
}

function getMockData(table: string, isList = false) {
    const mocks: Record<string, any> = {
        profiles: {
            id: 'mock-user-id',
            first_name: 'Mock',
            last_name: 'User',
            role: 'admin',
            email: 'mock@example.com'
        },
        shipments: {
            id: 'mock-shipment-1',
            code: 'SH-123',
            status: 'In Transit',
            origin_city: 'Istanbul',
            destination_city: 'Ankara'
        },
        loads: {
            id: 'L-101',
            owner_id: 'mock-user-id',
            status: 'delivered',
            origin: 'Istanbul',
            destination: 'Edirne',
            price: 15000,
            created_at: '2025-02-15T10:00:00Z',
            vehicle: null
        },
        expenses: {
            id: 'EXP-001',
            owner_id: 'mock-user-id',
            amount: 5000,
            date: '2025-02-10T14:30:00Z',
            category: 'fuel',
            description: 'Diesel Purchase'
        }
    };

    const data = mocks[table] || {};
    return isList ? [data] : data;
}
