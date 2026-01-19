export enum WarningSeverity {
    Info = "info",
    Warning = "warning",
    Error = "error"
}

export enum WarningCategory {
    MusicXML = "musicxml",
    Layout = "layout",
    MusicalElement = "musical_element",
    Expression = "expression"
}

export interface OSMDWarning {
    code: string;
    message: string;
    severity: WarningSeverity;
    category: WarningCategory;
    measureNumber?: number;
    staffIndex?: number;
    details?: Record<string, unknown>;
}

export class WarningCollector {
    private warnings: OSMDWarning[] = [];
    private onWarningCallback?: (warning: OSMDWarning) => void;

    constructor(onWarning?: (warning: OSMDWarning) => void) {
        this.onWarningCallback = onWarning;
    }

    public addWarning(warning: OSMDWarning): void {
        this.warnings.push(warning);
        if (this.onWarningCallback) {
            this.onWarningCallback(warning);
        }
    }

    public warn(
        code: string,
        message: string,
        severity: WarningSeverity = WarningSeverity.Warning,
        category: WarningCategory = WarningCategory.Layout,
        measureNumber?: number,
        staffIndex?: number,
        details?: Record<string, unknown>
    ): void {
        this.addWarning({ code, message, severity, category, measureNumber, staffIndex, details });
    }

    public getWarnings(): OSMDWarning[] {
        return [...this.warnings];
    }

    public getWarningsBySeverity(severity: WarningSeverity): OSMDWarning[] {
        return this.warnings.filter(w => w.severity === severity);
    }

    public getWarningsByCategory(category: WarningCategory): OSMDWarning[] {
        return this.warnings.filter(w => w.category === category);
    }

    public hasErrors(): boolean {
        return this.warnings.some(w => w.severity === WarningSeverity.Error);
    }

    public clear(): void {
        this.warnings = [];
    }

    public setOnWarningCallback(callback?: (warning: OSMDWarning) => void): void {
        this.onWarningCallback = callback;
    }
}
