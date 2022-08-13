import { Router } from 'express'
const routes = Router()

import multer from 'multer'

import { registerUser, updateUser } from './app/controllers/userController'
import { jwtController } from './app/controllers/jwtController'
import { fileController } from './app/controllers/fileController'
import { providerController } from './app/controllers/providerController'
import { AvailableController } from './app/controllers/availableController'
import { appointmentController, appointmentGet } from './app/controllers/appointmentController'
import { scheduleController } from './app/controllers/scheduleController'

import { jwtAuth } from './app/middleware/jwtAuth'
import multerConfig from './config/multer'

const upload = multer(multerConfig)

routes.post('/', registerUser)
routes.post('/jwt', jwtController)

routes.use(jwtAuth)

routes.get('/appointments', appointmentGet)
routes.get('/provider', providerController)
routes.get('/provider/:providerId/available', AvailableController)
routes.get('/schedule', scheduleController)
routes.post('/files', upload.single('file'), fileController)
routes.post('/appointment', appointmentController)
routes.put('/update', updateUser)

export default routes