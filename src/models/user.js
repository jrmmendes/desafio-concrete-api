import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: {
    type: [{
      numero: {
        type: String,
        required: true,
      },
      ddd: {
        required: true,
        type: String,
      },
    }],
  },
  ultimo_login: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' } });

export default model('user', userSchema);
