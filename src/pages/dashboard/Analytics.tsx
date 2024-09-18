import { Button } from "@mantine/core";
import React from "react";
import StatCard from "../../components/cards/StatCard";
import useStock from "../../hooks/useStock";
import useOrder from "../../hooks/useOrder";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import StockTable from "../../components/StockTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);


const Analytics = () => {
  const { stock } = useStock();
  const { orders } = useOrder();
  const productNames = stock?.map((item) => item.name);
  const quantities = stock?.map((item) => item.quantity);
  const consumedQuantities = stock?.map((item) => item.consumedQuantity);
  const availableItems = stock?.map(
    (item) => item.quantity - item.consumedQuantity
  );

  const topConsumed = stock
  ?.sort((a , b) => b.consumedQuantity - a.consumedQuantity).slice(0,5);

  const orderDates = orders?.map((order) => order.date);
  const orderQuantities = orders?.map((order) => order.quantity);

  console.log("Order dates: ", orderQuantities)

  const lineData = {
    labels: orderDates,
    datasets: [
      {
        label: "Orders Over Time",
        data: orderQuantities,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const comparisonData = {
    labels: productNames,
    datasets: [
      {
        label: "Available Stock",
        data: availableItems,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Consumed Stock",
        data: consumedQuantities,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      }
    ]
  }
  const barData = {
    labels: productNames,
    datasets: [
      {
        label: "Available Stock",
        data: quantities,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const doughnutData = {
    labels: productNames,
    datasets: [
      {
        label: "Consumed Stock",
        data: consumedQuantities,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const categories = stock?.reduce((acc: { [key: string]: number }, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {} as { [key: string]: number });
  const categoryLabels = Object.keys(categories || {});
  const categoryQuantities = Object.values(categories || {});

  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryQuantities,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 md:text-xl sm:text-lg xs:text-md">
          Report Analytics
        </h1>
        <Button color="#111827">Generate report</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-4 mt-4">
        <StatCard
          title="Total Orders"
          value={orders?.length || 0}
          quantity="sent"
          bgColor="bg-white"
        />
        <StatCard
          title="Total Stock Items"
          value={stock?.length || 0}
          quantity="items"
          bgColor="bg-white"
        />
        <StatCard
          title="Top Consumed"
          value={topConsumed?.length || 0}
          quantity="Items"
          bgColor="bg-white"
        />
        <StatCard
          title="Running Out Items"
          value={0}
          quantity="Items"
          bgColor="bg-white"
        />
      </div>

      <div className="w-full grid grid-cols-1 gap-20 md:grid-cols-2 mt-6">
        <div style={{ height: "500px" }}>
          <h2 className="text-lg font-bold">Stock Comparison</h2>
          <Bar
            data={comparisonData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div style={{ height: "500px" }}>
          <h2 className="text-lg font-bold">Order Trends</h2>
          <Line
            data={lineData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div style={{ height: "500px" }} className="">
          <h2 className="text-lg font-bold">Category Breakdown</h2>
          <Pie
            data={pieData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        <div style={{ height: "500px" }}>
          <h2 className="text-lg font-bold">Daily Uses</h2>
          <Bar
            data={barData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className="mt-20">
      <StockTable />
      </div>
    </div>
  );
};

export default Analytics;
