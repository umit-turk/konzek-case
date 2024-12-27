import React, { Component, ErrorInfo } from 'react';
import { connect } from 'react-redux';

interface Props {
  children: React.ReactNode;
  showToast: (message: string, type: string) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Hata loglarını sunucuya gönder
    this.logErrorToServer(error, errorInfo);
    
    // Kullanıcıya bildirim göster
    this.props.showToast('Bir hata oluştu. Lütfen sayfayı yenileyin.', 'error');
  }

  private logErrorToServer(error: Error, errorInfo: ErrorInfo) {
    // Hata loglarını sunucuya gönderme işlemi
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.toString(),
        errorInfo: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href
      })
    }).catch(console.error);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-error-main mb-4">
              Bir şeyler yanlış gitti
            </h2>
            <p className="text-gray-600 mb-6">
              Uygulama bir hata ile karşılaştı. Teknik ekibimiz bilgilendirildi.
            </p>
            <div className="space-y-4">
              <button
                onClick={this.handleReload}
                className="w-full btn btn-primary"
              >
                Sayfayı Yenile
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full btn btn-outlined"
              >
                Ana Sayfaya Dön
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-4 p-4 bg-gray-100 rounded text-sm text-gray-700 overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  showToast: (message: string, type: string) => 
    dispatch({ type: 'toast/showToast', payload: { message, type } })
});

export default connect(null, mapDispatchToProps)(ErrorBoundary); 