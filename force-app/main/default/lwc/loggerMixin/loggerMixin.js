import {LightningElement} from 'lwc';
import enableProductionConsoleLogs from '@salesforce/label/c.EnableProductionConsoleLogs';
import enableProductionConsoleLogsRestricted from '@salesforce/label/c.EnableProductionConsoleLogsRestricted';
import enableSandboxLogConsoleLogs from '@salesforce/label/c.EnableSandboxLogConsoleLogs';


export const LoggerMixin = (Base = LightningElement, componentName = null, textColor = 'black', prefix = '') => class extends Base {
    enableSandboxLogConsoleLogs = enableSandboxLogConsoleLogs === 'true'
    enableProdConsoleLogs = enableProductionConsoleLogs === 'true'
    restrictedForceLogging = enableProductionConsoleLogsRestricted ? enableProductionConsoleLogsRestricted.split(';') : [];
    isProduction = !location.href?.includes('sandbox');
    componentName = (Base.name && Base.name.length > 1)
        ? Base.name
        : componentName && componentName !== '' ? componentName : 'NA';

    connectedCallback() {
        if (this.isProduction && this.enableProdConsoleLogs) {
            console.log('%c%s', 'color:white;background:green;padding-around:5px;', 'console.log\'s are enabled globally!')
        } else if (this.isProduction && this.restrictedForceLogging.includes(this.componentName)) {
            console.log('%c%s', 'color:white;background:green;padding-around:5px;', 'console.log\'s are restrictly enabled!', this.restrictedForceLogging)
        } else if (this.isProduction && !this.enableProdConsoleLogs) {
            console.log('%c%s', 'color:black;background:orange;padding-around:5px;', 'console.log\'s are disabled in production!')
        } else if (!this.enableSandboxLogConsoleLogs && !this.isProduction) {
            console.log('%c%s', 'color:black;background:orange;padding-around:5px;', 'console.log\'s are disabled, modify label enableSandboxLogConsoleLogs to enable them in sandbox environment! ')
        }
        if (this.componentName === 'NA' && (this.enableSandboxLogConsoleLogs && !this.isProduction) || this.enableProdConsoleLogs && this.isProduction) {
            console.log('%c%s', 'color:black;background:orange;padding-around:5px;', 'console.log\'s could not display correctly, pass a componentName in the costructor or enable aura debug mode! ')
        }
        super.connectedCallback?.();
    }


    log() {
        if (this.enableSandboxLogConsoleLogs && !this.isProduction || ((this.enableProdConsoleLogs || this.restrictedForceLogging.includes(this.componentName)) && this.isProduction)) {
            console.log.apply(console, (['%c' + prefix + '[' + this.componentName + ']', 'color:' + textColor].concat([].slice.call(arguments))));
        }

    }


};