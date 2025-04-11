
import { Metric } from "@/types/architecture";

export const metrics: Metric[] = [
  {
    name: "Throughput",
    key: "throughput",
    description: "The number of requests an application can handle per second, indicating its processing capacity.",
    unit: "requests/sec"
  },
  {
    name: "Latency",
    key: "latency",
    description: "The time taken for a request to be processed and response to be returned, measuring response speed.",
    unit: "ms"
  },
  {
    name: "Availability",
    key: "availability",
    description: "The percentage of time an application is operational and accessible to users.",
    unit: "%"
  },
  {
    name: "Resource Utilization",
    key: "resourceUtilization",
    description: "The percentage of CPU, memory, and other system resources used by the application.",
    unit: "%"
  },
  {
    name: "Fault Tolerance",
    key: "faultTolerance",
    description: "The ability of an application to continue functioning in the presence of component failures.",
    unit: "scale 1-10"
  },
  {
    name: "Elasticity",
    key: "elasticity",
    description: "How well an application can adapt to workload changes by adding or removing resources automatically.",
    unit: "scale 1-10"
  },
  {
    name: "Cost Efficiency",
    key: "costEfficiency",
    description: "The balance between performance and the resources (and therefore costs) required to achieve it.",
    unit: "scale 1-10"
  },
  {
    name: "Data Consistency",
    key: "dataConsistency",
    description: "The degree to which all nodes in a distributed system see the same data at the same time.",
    unit: "scale 1-10"
  }
];
