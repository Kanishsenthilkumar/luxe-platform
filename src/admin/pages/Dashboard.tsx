import React from 'react';
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Eye } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Products',
      value: '40',
      change: '+12%',
      changeType: 'increase',
      icon: Package,
    },
    {
      name: 'Total Orders',
      value: '156',
      change: '+23%',
      changeType: 'increase',
      icon: ShoppingCart,
    },
    {
      name: 'Total Customers',
      value: '89',
      change: '+8%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Revenue',
      value: '₹2,45,890',
      change: '+15%',
      changeType: 'increase',
      icon: DollarSign,
    },
  ];

  const recentOrders = [
    { id: '1', customer: 'Priya Sharma', amount: '₹12,999', status: 'Confirmed', date: '2024-01-15' },
    { id: '2', customer: 'Rahul Kumar', amount: '₹8,499', status: 'Pending', date: '2024-01-15' },
    { id: '3', customer: 'Anita Singh', amount: '₹25,999', status: 'Shipped', date: '2024-01-14' },
    { id: '4', customer: 'Vikram Patel', amount: '₹15,799', status: 'Delivered', date: '2024-01-14' },
  ];

  const topProducts = [
    { name: 'Silk Evening Gown', sales: 45, revenue: '₹1,12,475' },
    { name: 'Italian Suit', sales: 32, revenue: '₹1,47,168' },
    { name: 'Designer Blazer', sales: 28, revenue: '₹53,172' },
    { name: 'Cashmere Overcoat', sales: 24, revenue: '₹79,176' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your LUXE store admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Orders
              </button>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Package className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Add New Product</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Eye className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">View Store</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <ShoppingCart className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Manage Orders</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;