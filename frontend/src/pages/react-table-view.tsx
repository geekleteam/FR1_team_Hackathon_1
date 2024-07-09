import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const TableScreen = () => {
  const [activeTab, setActiveTab] = useState('Fast');
  const [summaryExpanded, setSummaryExpanded] = useState(false);

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
    "Fast": "This tech stack prioritizes speed and performance. With Node.js and Express.js on the backend, you get lightning-fast request handling and non-blocking I/O. MongoDB provides quick read/write operations for data storage. On the frontend, React and Next.js offer optimal rendering performance and quick load times. This stack is ideal for applications where speed is crucial, such as real-time applications or high-traffic websites.",
    "Cheap": "This stack focuses on cost-effectiveness without sacrificing too much functionality. Python and Flask provide a lightweight backend that's quick to develop. SQLite offers a zero-configuration database that's perfect for small to medium-sized applications. Vue.js on the frontend is easy to learn and efficient. Netlify for hosting provides a generous free tier and easy deployment. This stack is perfect for startups, MVPs, or projects with tight budgets.",
    "Secure": "This tech stack emphasizes security and robustness. Java and Spring Boot offer strong typing and comprehensive security features. PostgreSQL is known for its data integrity and complex query support. Angular provides built-in protections against common web vulnerabilities. AWS offers a wide range of security services and compliance certifications. While this stack has a steeper learning curve, it's ideal for applications dealing with sensitive data or requiring high levels of security."
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
    </div>
  );
};

export default TableScreen;