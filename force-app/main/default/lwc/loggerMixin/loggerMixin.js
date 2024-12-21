import {LightningElement} from 'lwc';
import forceLogging from '@salesforce/label/c.EnableProductionConsoleLogs';
import forceLoggingRetricted from '@salesforce/label/c.EnableProductionConsoleLogsRetricted';
import enableSandboxLogConsoleLogs from '@salesforce/label/c.EnableSandboxLogConsoleLogs';


export const LoggerMixin = (Base = LightningElement, textColor = 'black', prefix = '') => class extends Base {
    activateLogging = enableSandboxLogConsoleLogs === 'true'
    forceLogging = forceLogging === 'true'
    restrictedForceLogging = forceLoggingRetricted ? forceLoggingRetricted.split(';') : [];
    isProduction = !location.href?.includes('sandbox');

    connectedCallback() {
        if (this.isProduction && this.forceLogging) {
            console.log('%c%s', 'color:white;background:green;padding-around:5px;', 'console.log\'s are enabled globally!')
        } else if (this.isProduction && this.restrictedForceLogging.includes(Base.name)) {
            console.log('%c%s', 'color:white;background:green;padding-around:5px;', 'console.log\'s are restrictly enabled!', this.restrictedForceLogging)
        } else if (this.isProduction && !this.forceLogging) {
            console.log('%c%s', 'color:black;background:orange;padding-around:5px;', 'console.log\'s are disabled in production!')
        } else if (!this.activateLogging && !this.isProduction) {
            console.log('%c%s', 'color:black;background:orange;padding-around:5px;', 'console.log\'s are disabled, modify loggerMixin.activateLogging to enable them in sandbox environment! ')
        }
        super.connectedCallback?.();
    }


    log() {
        if (this.activateLogging && !this.isProduction || ((this.forceLogging || this.restrictedForceLogging.includes(Base.name)) && this.isProduction)) {
            console.log.apply(console, (['%c' + prefix + '[' + Base.name + ']', 'color:' + textColor].concat([].slice.call(arguments))));
        }

    }


};