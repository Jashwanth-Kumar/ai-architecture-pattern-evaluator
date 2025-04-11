
import { ArchitecturePattern } from "@/types/architecture";

export const architecturePatterns: ArchitecturePattern[] = [
  {
    id: "monolithic",
    name: "Monolithic Architecture",
    color: "#4f46e5",
    description: "A single, unified codebase where all components of an application are interconnected and run as a single service.",
    benefits: [
      "Simplicity in development and deployment",
      "Easier to test as a complete unit",
      "Less cross-cutting concerns like logging, security",
      "Straightforward debugging process",
      "Lower complexity for smaller applications"
    ],
    limitations: [
      "Scalability becomes challenging as the application grows",
      "Single point of failure risk",
      "Technology stack is fixed for the entire application",
      "Continuous deployment can be difficult",
      "Team coordination becomes complex with large codebases"
    ]
  },
  {
    id: "microservices",
    name: "Microservices Architecture",
    color: "#0891b2",
    description: "An architectural approach where an application is built as a collection of small, independent services that communicate over a network.",
    benefits: [
      "Independent development and deployment",
      "Technology diversity - different services can use different stacks",
      "Improved fault isolation",
      "Scalability - individual services can be scaled independently",
      "Better suited for large, complex applications"
    ],
    limitations: [
      "Increased operational complexity",
      "Network latency between services",
      "Distributed system challenges (consistency, transactions)",
      "Testing complexity across service boundaries",
      "Requires strong DevOps practices"
    ]
  },
  {
    id: "serverless",
    name: "Serverless Architecture",
    color: "#9333ea",
    description: "A cloud computing execution model where the cloud provider manages the infrastructure, automatically provisioning and scaling resources as needed.",
    benefits: [
      "No server management needed",
      "Pay-per-use pricing model",
      "Automatic scaling",
      "Reduced operational costs for variable workloads",
      "Focus on code rather than infrastructure"
    ],
    limitations: [
      "Cold start latency issues",
      "Limited execution duration",
      "Vendor lock-in concerns",
      "Debugging and monitoring challenges",
      "Less control over underlying infrastructure"
    ]
  },
  {
    id: "eventdriven",
    name: "Event-Driven Architecture",
    color: "#16a34a",
    description: "A software architecture pattern promoting the production, detection, consumption of, and reaction to events between loosely coupled components.",
    benefits: [
      "Loose coupling between components",
      "Highly scalable and responsive",
      "Good for real-time data processing",
      "Adaptable to changing requirements",
      "Facilitates asynchronous operations"
    ],
    limitations: [
      "Complexity in event tracking and debugging",
      "Eventual consistency challenges",
      "Event versioning and compatibility issues",
      "Potential event storms under heavy load",
      "Can be overkill for simple applications"
    ]
  },
  {
    id: "p2p",
    name: "Peer-to-Peer Architecture",
    color: "#f59e0b",
    description: "A distributed architecture where tasks and workloads are shared among peers without a centralized server, creating a network of equals.",
    benefits: [
      "High resilience - no single point of failure",
      "Efficient resource utilization across the network",
      "Scales naturally with more peers",
      "Reduced central infrastructure costs",
      "Better privacy as data can be distributed"
    ],
    limitations: [
      "Security challenges with distributed trust",
      "Inconsistent performance based on peer availability",
      "Complex coordination and consensus mechanisms",
      "Discovery and NAT traversal challenges",
      "Regulatory compliance can be difficult"
    ]
  },
  {
    id: "soa",
    name: "Service-Oriented Architecture (SOA)",
    color: "#ef4444",
    description: "An architectural style where services are provided to other components through a communication protocol over a network.",
    benefits: [
      "Reusable services across different applications",
      "Standardized service contracts",
      "Business-focused approach to service design",
      "Integration with legacy systems",
      "Improved maintainability through service abstraction"
    ],
    limitations: [
      "Can become complex with service orchestration",
      "Potential performance overhead from layers of abstraction",
      "Service governance challenges",
      "Requires careful service design and granularity",
      "Can lead to distributed monoliths if not carefully implemented"
    ]
  }
];
