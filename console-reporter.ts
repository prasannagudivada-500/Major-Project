import {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class ConsoleReporter implements Reporter {
  private consoleMessages: Map<string, string[]> = new Map();
  private outputFile = 'test-results/console-logs.xml';

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    
    // Ensure test-results directory exists
    const dir = path.dirname(this.outputFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  onTestBegin(test: TestCase) {
    this.consoleMessages.set(test.id, []);
  }

  onStdOut(chunk: string | Buffer, test?: TestCase) {
    if (test) {
      const messages = this.consoleMessages.get(test.id) || [];
      messages.push(`[STDOUT] ${chunk.toString()}`);
      this.consoleMessages.set(test.id, messages);
    }
  }

  onStdErr(chunk: string | Buffer, test?: TestCase) {
    if (test) {
      const messages = this.consoleMessages.get(test.id) || [];
      messages.push(`[STDERR] ${chunk.toString()}`);
      this.consoleMessages.set(test.id, messages);
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const messages = this.consoleMessages.get(test.id) || [];
    
    // Store console output in test result
    if (messages.length > 0) {
      const consoleOutput = messages.join('\n');
      console.log(`\nTest: ${test.title}`);
      console.log(`Console Output:\n${consoleOutput}`);
    }
  }

  onEnd(result: FullResult) {
    console.log(`\nFinished the run: ${result.status}`);
    
    // Generate XML report with console messages
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<testsuites>\n';
    xmlContent += '  <testsuite name="Console Logs Report">\n';
    
    this.consoleMessages.forEach((messages, testId) => {
      xmlContent += `    <testcase id="${this.escapeXml(testId)}">\n`;
      xmlContent += '      <system-out>\n';
      xmlContent += `        <![CDATA[\n${messages.join('\n')}\n        ]]>\n`;
      xmlContent += '      </system-out>\n';
      xmlContent += '    </testcase>\n';
    });
    
    xmlContent += '  </testsuite>\n';
    xmlContent += '</testsuites>';
    
    fs.writeFileSync(this.outputFile, xmlContent);
    console.log(`\nConsole logs XML report saved to: ${this.outputFile}`);
  }

  private escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }
}

export default ConsoleReporter;
