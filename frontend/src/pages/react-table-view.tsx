import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Info } from 'lucide-react';

const TableScreen = () => {
  const [activeTab, setActiveTab] = useState('Fast');
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [spoilerVisible, setSpoilerVisible] = useState(false);

  const tablesData = {
    "Fast": [
      { "name": "Node.js", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Moderate", "costEfficiency": "High" },
      { "name": "Express.js", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Low", "costEfficiency": "High" },
      { "name": "MongoDB", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Low", "costEfficiency": "Moderate" },
      { "name": "React", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Moderate", "costEfficiency": "High" },
      { "name": "Next.js", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Growing", "learningCurve": "Moderate", "costEfficiency": "High" }
    ],
    "Cheap": [
      { "name": "Python", "performance": false, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Low", "costEfficiency": "Very High" },
      { "name": "Flask", "performance": true, "easeOfUse": true, "scalability": false, "ecosystem": "Moderate", "learningCurve": "Low", "costEfficiency": "Very High" },
      { "name": "SQLite", "performance": false, "easeOfUse": true, "scalability": false, "ecosystem": "Large", "learningCurve": "Low", "costEfficiency": "Very High" },
      { "name": "Vue.js", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Moderate", "learningCurve": "Low", "costEfficiency": "High" },
      { "name": "Netlify", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Growing", "learningCurve": "Low", "costEfficiency": "High" }
    ],
    "Secure": [
      { "name": "Java", "performance": true, "easeOfUse": false, "scalability": true, "ecosystem": "Very Large", "learningCurve": "High", "costEfficiency": "Moderate" },
      { "name": "Spring Boot", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "High", "costEfficiency": "Moderate" },
      { "name": "PostgreSQL", "performance": true, "easeOfUse": true, "scalability": true, "ecosystem": "Large", "learningCurve": "Moderate", "costEfficiency": "High" },
      { "name": "Angular", "performance": true, "easeOfUse": false, "scalability": true, "ecosystem": "Large", "learningCurve": "High", "costEfficiency": "Moderate" },
      { "name": "AWS", "performance": true, "easeOfUse": false, "scalability": true, "ecosystem": "Very Large", "learningCurve": "High", "costEfficiency": "Moderate" }
    ]
  };

  const summaries = {
    "Fast": "This tech stack prioritizes speed and performance. With Node.js and Express.js on the backend, you get lightning-fast request handling and non-blocking I/O. MongoDB provides quick read/write operations for data storage.",
    "Cheap": "This stack focuses on cost-effectiveness without sacrificing too much functionality. Python and Flask provide a lightweight backend that's quick to develop. SQLite offers a zero-configuration database that's perfect for small to medium-sized applications.",
    "Secure": "This tech stack aligns closely with the one you've described, particularly in the use of Java, PostgreSQL, Angular, and AWS. It's a robust combination that offers high performance, scalability, and a large ecosystem, which are critical for a fintech startup handling real-time financial transactions and data.",
  };
  
  const startupComparisons = {
    "Fast": "Netflix initially used a similar stack for their API architecture.",
    "Cheap": "Instagram's initial MVP was built using a similar Python-based stack.",
    "Secure": "Robinhood, the popular stock trading app, initially used a tech stack similar to the one described. Their early stack included Java for backend, PostgreSQL for database, Angular for frontend, and AWS for cloud infrastructure. They likely used Spring Boot as well. This combination provided high performance, scalability, and a large ecosystem - crucial for a fintech startup."
  };

  const tabs = [
    { id: 'Fast', label: 'Fast tech stack' },
    { id: 'Cheap', label: 'Cheapest tech stack' },
    { id: 'Secure', label: 'A bit more secure tech stack' }
  ];

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Performance</th>
              <th className="border p-2">Ease of Use</th>
              <th className="border p-2">Scalability</th>
              <th className="border p-2">Ecosystem</th>
              <th className="border p-2">Learning Curve</th>
              <th className="border p-2">Cost Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {tablesData[activeTab].map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2 text-center">{row.performance ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                <td className="border p-2 text-center">{row.easeOfUse ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                <td className="border p-2 text-center">{row.scalability ? <Check size={18} className="inline text-green-500" /> : <X size={18} className="inline text-red-500" />}</td>
                <td className="border p-2">{row.ecosystem}</td>
                <td className="border p-2">{row.learningCurve}</td>
                <td className="border p-2">{row.costEfficiency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setSummaryExpanded(!summaryExpanded)}>
          <h3 className="text-xl font-semibold">Stack Summary</h3>
          {summaryExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
        {summaryExpanded && (
          <p className="text-gray-700 mt-2">{summaries[activeTab]}</p>
        )}
      </div>

      <div className="bg-green-50 p-4 rounded-lg" style={{marginTop: "1rem"}}>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setSpoilerVisible(!spoilerVisible)}>
          <h3 className="text-xl font-semibold flex items-center">
            <Info size={24} className="mr-2" />
            Startup Comparison
          </h3>
          {spoilerVisible ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
        {spoilerVisible && (
          <p className="text-gray-700 mt-2">{startupComparisons[activeTab]}</p>
        )}
      </div>

    </div>
  );
};

export default TableScreen;