import { useState } from 'react';
import { Container, TextField, Button, Typography, Stack, CircularProgress, Alert, Box } from '@mui/material';
import AnimatedContent from '../assets/AnimatedContent';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      const response = await new Promise((resolve) => 
        setTimeout(() => resolve({
          reason: "The message is a phishing attempt, imitating a Netflix payment failure to steal banking information via a malicious link.",
          confidence_score: 65
        }), 2000)
      );

      setResult(response);
    } catch (err) {
      setError('An error occurred while analyzing the content');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData({ email: '', phone: '', content: '' });
  };

  return (
    <div style={{
      width: '100%', // Take up full width of parent
      height: '80vh', // Take up full height of parent
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #000000, #4b0082)'
    }}>
    <Container maxWidth="md" maxHeight="md" className="gradient-bg" sx={{ py: 4}}>
      <Stack spacing={3} sx={{
        bgcolor: 'rgba(255,255,255,0.9)',
        borderRadius: 4,
        p: 4,
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
        backdropFilter: 'blur(10px)',
        minHeight: '500px'
      }}>
        <Typography variant="h3" sx={{
          fontWeight: 700,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 3
        }}>
          Fraud Shield
        </Typography>

        {!result ? (
          <>
            <TextField
              label="Email Address"
              variant="outlined"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
              fullWidth
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
              fullWidth
            />

            <TextField
              label="Content to Analyze"
              variant="outlined"
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
              fullWidth
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleCheck}
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '12px',
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Check for Fraud'}
            </Button>
          </>
        ) : (
          <>
            {/* <Box sx={{
              p: 3,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}> */}
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Analysis Results
              </Typography>
              
              <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Confidence Score:
              </Typography>
              <Box sx={{
                width: '100%',
                height: '10px',
                bgcolor: '#e0e7ff',
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <Box sx={{
                  width: `${result.confidence_score}%`,
                  height: '100%',
                  background: 
                    result.confidence_score <= 30 ? '#4caf50' : // Green
                    result.confidence_score <= 50 ? '#ffeb3b' : // Yellow
                    result.confidence_score <= 70 ? '#ff9800' : // Orange
                    '#f44336', // Red
                  borderRadius: '5px'
                }} />
              </Box>
              <Typography variant="body2" sx={{ mt: 1, color: '#64748b' }}>
                {result.confidence_score}% confidence
              </Typography>
            </Box>

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  Analysis:
                </Typography>
                <Typography variant="body2" sx={{ 
                  p: 2,
                  bgcolor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  {result.reason}
                </Typography>
              </Box>
            {/* </Box> */}

            <Button
              variant="outlined"
              size="large"
              onClick={handleReset}
              sx={{
                borderColor: '#6366f1',
                color: '#6366f1',
                py: 2,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e0e7ff',
                  borderColor: '#6366f1'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Analyze Another
            </Button>
          </>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Stack>
    </Container>
    </div>
  );
}