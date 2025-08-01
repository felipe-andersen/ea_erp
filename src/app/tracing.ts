import {
    diag,
    DiagConsoleLogger,
    DiagLogLevel
} from '@opentelemetry/api';
import { NodeSDK,  } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
// import { KnexInstrumentation } from '@opentelemetry/instrumentation-knex';


diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
    serviceName: 'embarque-angra-ui',
    traceExporter: new OTLPTraceExporter({
        url: 'http://otel-collector:4317',
        
    }),
    instrumentations: [
        new HttpInstrumentation(),
        // new KnexInstrumentation()
    ]
});

process.on('beforeExit', async () => {
    await sdk.shutdown()
});

export const initalizeTracing = async () => {
    return sdk.start()
};