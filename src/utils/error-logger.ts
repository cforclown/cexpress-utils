import { Logger } from './logger';
import { Environment } from './environment';

export async function ErrorLogger (err: Record<string, any>, printTrace = true): Promise<void> {
  if (Environment.getNodeEnv() === 'test') {
    return;
  }

  Logger.error('=========================================');
  try {
    Logger.danger(`MESSAGE: ${err.message ?? ''}`);
    if (printTrace && err.stack) {
      Logger.warn('STACKTRACE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      Logger.warn(err.stack);
      Logger.warn('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    }
  } catch (err) {
    if (err instanceof Error) {
      Logger.error(err.message);
    }
  }
  Logger.error('=========================================');
}
