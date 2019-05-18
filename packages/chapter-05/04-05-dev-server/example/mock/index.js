module.exports = {
    'GET /api/user/list/:id/:type': (req, res) => {
        const {type} = req.params;
        if (type === 'webpack') {
            return res.status(403).json({
                status: 'error',
                code: 403
            });
        }
        return res.json([
            {
                id: 1,
                username: 'kenny',
                sex: 6
            },
            {
                id: 2,
                username: 'kenny',
                sex: 6
            }
        ]);
    },
    'GET /repos/hello': (req, res) => {
        return res.json({
            text: 'this is from mock server'
        });
    },

    'GET /api/jobs/:id': (req, res) => {
        return res.json({
            text: 'url: /api/jobs/:id'
        });
    }
};
