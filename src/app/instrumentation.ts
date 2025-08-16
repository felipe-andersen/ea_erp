import opentelemetry, { metrics } from '@opentelemetry/api';
import {
  ConsoleMetricExporter,
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import {
  defaultResource,
  resourceFromAttributes,
} from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';

const resource = defaultResource().merge(
  resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'ea-2t7r5j',
    // [ATTR_SERVICE_VERSION]: '0.1.0',
  }),
);


const metricExporterReaderConsole = new PeriodicExportingMetricReader({
  exporter: new ConsoleMetricExporter(),
  // Default is 60000ms (60 seconds). Set to 10 seconds for demonstrative purposes only.
  exportIntervalMillis: 10000,
});

const metricExporterReaderBackend = new PeriodicExportingMetricReader({
  exporter: new OTLPMetricExporter({
    url: 'http://localhost:4318/v1/metrics',
  }),
  // Default is 60000ms (60 seconds). Set to 10 seconds for demonstrative purposes only.
  exportIntervalMillis: 10000,
});

const myServiceMeterProvider = new MeterProvider({
  resource: resource,
  readers: [metricExporterReaderConsole, metricExporterReaderBackend],
});

// Set this MeterProvider to be global to the app being instrumented.
export function initObservability() {
    opentelemetry.metrics.setGlobalMeterProvider(myServiceMeterProvider)
};

type MeterCategoryType = 'auth-service' | 'cache-service' | 'components'

export function createMeter(meterCategory: MeterCategoryType) {
    const meter = metrics.getMeter(meterCategory);
    return meter
}









