import app from './app';

const port = parseInt(process.env.PORT || '3000', 10);

// Trust proxy headers — Zerops L7 balancer terminates SSL and
// forwards requests via reverse proxy. Without this, Express
// misreports req.ip and req.protocol behind the balancer.
app.set('trust proxy', true);

// Bind 0.0.0.0 — Zerops routes traffic to the container's
// VXLAN IP. Binding localhost would cause 502 errors.
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});
