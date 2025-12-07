export interface IBookingStatusDistribution {
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
    count: number;
}

// Revenue sum wrapper
export interface IRevenueSum {
    _sum: {
        amount: number | null;
    };
}

// Main dashboard meta data
export interface IGuideDashboardMeta {
    bookingCount: number;
    reviewCount: number;
    touristCount: number;
    totalRevenue: IRevenueSum;
    formattedBookingStatusDistribution: IBookingStatusDistribution[];
}

// Full response wrapper
export interface IGuideDashboardResponse {
    success: boolean;
    message: string;
    data: IGuideDashboardMeta;
}

export interface AdminDashboardMeta {
    touristCount: number;
    guideCount: number;
    adminCount: number;
    bookingCount: number;
    paymentCount: number;
    totalRevenue: {
        _sum: {
            amount: number | null;
        };
    };
    barChartData: BarChartData[];
    pieChartData: PieChartData[];
}

export interface BarChartData {
    month: string; 
    count: number;
}

export interface PieChartData {
  status: string;
  count: number;
}