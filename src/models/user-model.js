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
    type: [new Schema({
      numero: {
        type: String,
        required: true,
      },
      ddd: {
        required: true,
        type: String,
      },
    }, { _id: false })],
  },
  ultimo_login: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    required: true,
  },
}, {
  timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' },
  versionKey: false,
});

export default model('user', userSchema);
