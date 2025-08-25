import React, { useState, useEffect } from 'react';
import { runAccessibilityAudit, checkColorContrast, accessibilityTesting } from '../lib/accessibility';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

const AccessibilityAudit = () => {
  const [auditResults, setAuditResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [colorContrastTest, setColorContrastTest] = useState({
    foreground: '#000000',
    background: '#ffffff',
    result: null,
  });

  const runAudit = async () => {
    setIsRunning(true);
    try {
      const results = await runAccessibilityAudit();
      setAuditResults(results);
    } catch (error) {
      console.error('Audit failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const testColorContrast = () => {
    try {
      const result = checkColorContrast(colorContrastTest.foreground, colorContrastTest.background);
      setColorContrastTest(prev => ({ ...prev, result }));
    } catch (error) {
      console.error('Color contrast test failed:', error);
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'serious':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'moderate':
        return <Info className="h-4 w-4 text-yellow-500" />;
      case 'minor':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical':
        return 'destructive';
      case 'serious':
        return 'destructive';
      case 'moderate':
        return 'warning';
      case 'minor':
        return 'secondary';
      default:
        return 'success';
    }
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Accessibility Audit</CardTitle>
          <CardDescription>
            Development tool for accessibility testing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Audit Controls */}
          <div className="flex gap-2">
            <Button 
              onClick={runAudit} 
              disabled={isRunning}
              size="sm"
            >
              {isRunning ? 'Running...' : 'Run Audit'}
            </Button>
          </div>

          {/* Audit Results */}
          {auditResults && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">
                  {auditResults.passes?.length || 0} Passed
                </span>
              </div>
              
              {auditResults.violations?.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700">
                      {auditResults.violations.length} Violations
                    </span>
                  </div>
                  
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {auditResults.violations.map((violation, index) => (
                      <div key={index} className="p-2 bg-red-50 rounded text-xs">
                        <div className="flex items-center gap-1 mb-1">
                          {getImpactIcon(violation.impact)}
                          <Badge variant={getImpactColor(violation.impact)} className="text-xs">
                            {violation.impact}
                          </Badge>
                        </div>
                        <div className="font-medium">{violation.help}</div>
                        <div className="text-gray-600 mt-1">
                          {violation.nodes?.length} element(s) affected
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {auditResults.incomplete?.length > 0 && (
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">
                    {auditResults.incomplete.length} Incomplete
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Color Contrast Tester */}
          <div className="border-t pt-3">
            <h4 className="text-sm font-medium mb-2">Color Contrast Test</h4>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="color"
                  value={colorContrastTest.foreground}
                  onChange={(e) => setColorContrastTest(prev => ({ 
                    ...prev, 
                    foreground: e.target.value 
                  }))}
                  className="w-8 h-8 rounded border"
                  title="Foreground color"
                />
                <input
                  type="color"
                  value={colorContrastTest.background}
                  onChange={(e) => setColorContrastTest(prev => ({ 
                    ...prev, 
                    background: e.target.value 
                  }))}
                  className="w-8 h-8 rounded border"
                  title="Background color"
                />
                <Button onClick={testColorContrast} size="sm" variant="outline">
                  Test
                </Button>
              </div>

              {colorContrastTest.result && (
                <div className="text-xs space-y-1">
                  <div>Ratio: {colorContrastTest.result.ratio.toFixed(2)}:1</div>
                  <div className="flex gap-2">
                    <Badge variant={colorContrastTest.result.AA ? 'success' : 'destructive'}>
                      WCAG AA {colorContrastTest.result.AA ? '✓' : '✗'}
                    </Badge>
                    <Badge variant={colorContrastTest.result.AAA ? 'success' : 'secondary'}>
                      WCAG AAA {colorContrastTest.result.AAA ? '✓' : '✗'}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Preview */}
              <div 
                className="p-2 rounded text-sm"
                style={{
                  backgroundColor: colorContrastTest.background,
                  color: colorContrastTest.foreground,
                }}
              >
                Sample text preview
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityAudit;

