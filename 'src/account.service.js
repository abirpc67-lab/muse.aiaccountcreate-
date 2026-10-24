const sessions = new Map();

export class AccountService {
  static initSession() {
    const sessionId = 'sess_' + Math.random().toString(36).substring(2, 11);
    const sessionData = {
      id: sessionId,
      state: 'initialized',
      createdAt: new Date().toISOString()
    };
    sessions.set(sessionId, sessionData);
    return sessionData;
  }

  static createAccount(data) {
    const { sessionId, email } = data;
    
    if (!sessions.has(sessionId)) {
      const error = new Error('Session not found');
      error.statusCode = 404;
      throw error;
    }

    const session = sessions.get(sessionId);
    if (session.state === 'completed') {
      const error = new Error('Duplicate request: Session already completed');
      error.statusCode = 400;
      throw error;
    }

    session.state = 'processing';
    session.email = email;

    setTimeout(() => {
      session.state = 'completed';
    }, 1000);

    return session;
  }

  static getStatus(sessionId) {
    const session = sessions.get(sessionId);
    if (!session) {
      const error = new Error('Session not found');
      error.statusCode = 404;
      throw error;
    }
    return session;
  }
}
