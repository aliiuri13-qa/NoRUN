import React, { useState, useEffect } from 'react';
import { AthleteProfile } from '../types';

interface AthleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AthleteProfile;
  onSaveProfile: (profile: AthleteProfile) => void;
}

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
];

const GOAL_OPTIONS = [
  'Hipertrofia',
  'Ganho de Força',
  'Definição Muscular',
  'Condicionamento Físico',
  'Saúde & Bem-estar',
];

export const AthleteModal: React.FC<AthleteModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<AthleteProfile>(profile);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, informe o nome do atleta.');
      return;
    }
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#161b29] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#00d2ff]/15 text-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-white font-bold text-[17px]">
                Cadastro do Atleta
              </h3>
              <p className="font-body-sm text-[#859399]">Configure seus dados e métricas físicas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#242a38] text-[#859399] hover:text-white flex items-center justify-center active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto py-4 space-y-4">
          {/* Avatar Selector */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#1a1f2d] border border-white/5">
            <span className="font-label-caps text-[10px] text-[#bbc9cf] uppercase font-bold">
              Foto de Perfil
            </span>
            <div className="flex items-center gap-3">
              <img
                src={formData.avatar}
                alt="Avatar atual"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#00d2ff] shadow-md shadow-[#00d2ff]/20 shrink-0"
              />
              <div className="flex flex-col gap-1.5 flex-1">
                <span className="text-[12px] text-[#859399]">Escolha uma imagem de perfil:</span>
                <div className="flex gap-2">
                  {AVATAR_OPTIONS.map((url, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, avatar: url })}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all active:scale-95 ${
                        formData.avatar === url ? 'border-[#00d2ff] scale-105' : 'border-white/10 opacity-70'
                      }`}
                    >
                      <img src={url} alt={`Opção ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="pt-1">
              <input
                type="url"
                placeholder="Ou cole a URL de uma foto sua..."
                value={customAvatarUrl}
                onChange={(e) => {
                  setCustomAvatarUrl(e.target.value);
                  if (e.target.value.trim().startsWith('http')) {
                    setFormData({ ...formData, avatar: e.target.value.trim() });
                  }
                }}
                className="w-full h-9 rounded-lg bg-[#0d1320] px-3 text-[12px] text-white border border-white/5 focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="p-3.5 rounded-xl bg-[#1a1f2d] border border-white/5 space-y-3">
            <span className="font-label-caps text-[10px] text-[#00d2ff] uppercase font-bold tracking-wider">
              Dados Pessoais
            </span>

            <div className="space-y-1">
              <label className="text-[12px] text-[#bbc9cf]">Nome Completo / Como quer ser chamado</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Alison Oliveira"
                className="w-full h-11 rounded-lg bg-[#0d1320] px-3 text-[14px] text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[12px] text-[#bbc9cf]">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu.email@exemplo.com"
                className="w-full h-11 rounded-lg bg-[#0d1320] px-3 text-[14px] text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[12px] text-[#bbc9cf]">Objetivo Principal de Treino</label>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full h-11 rounded-lg bg-[#0d1320] px-3 text-[14px] text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
              >
                {GOAL_OPTIONS.map((g) => (
                  <option key={g} value={g} className="bg-[#161b29]">
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Physical Metrics */}
          <div className="p-3.5 rounded-xl bg-[#1a1f2d] border border-white/5 space-y-3">
            <span className="font-label-caps text-[10px] text-[#00d2ff] uppercase font-bold tracking-wider">
              Métricas Corporais
            </span>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weightKg || ''}
                  onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) || 0 })}
                  placeholder="78.5"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-2.5 text-center text-[15px] font-bold text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">Altura (cm)</label>
                <input
                  type="number"
                  value={formData.heightCm || ''}
                  onChange={(e) => setFormData({ ...formData, heightCm: parseInt(e.target.value) || 0 })}
                  placeholder="178"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-2.5 text-center text-[15px] font-bold text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">BF Estimado %</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.bodyFatPercent || ''}
                  onChange={(e) => setFormData({ ...formData, bodyFatPercent: parseFloat(e.target.value) || 0 })}
                  placeholder="14"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-2.5 text-center text-[15px] font-bold text-[#69f6b9] border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>
            </div>
          </div>

          {/* Baseline PRs */}
          <div className="p-3.5 rounded-xl bg-[#1a1f2d] border border-white/5 space-y-3">
            <span className="font-label-caps text-[10px] text-[#00d2ff] uppercase font-bold tracking-wider">
              Cargas Máximas / Recordes Atuais (kg)
            </span>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">Supino</label>
                <input
                  type="number"
                  value={formData.maxBenchPress || ''}
                  onChange={(e) => setFormData({ ...formData, maxBenchPress: parseInt(e.target.value) || 0 })}
                  placeholder="90"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-2 text-center text-[14px] font-bold text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">Agachamento</label>
                <input
                  type="number"
                  value={formData.maxSquat || ''}
                  onChange={(e) => setFormData({ ...formData, maxSquat: parseInt(e.target.value) || 0 })}
                  placeholder="120"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-2 text-center text-[14px] font-bold text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">Lev. Terra</label>
                <input
                  type="number"
                  value={formData.maxDeadlift || ''}
                  onChange={(e) => setFormData({ ...formData, maxDeadlift: parseInt(e.target.value) || 0 })}
                  placeholder="150"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-2 text-center text-[14px] font-bold text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl bg-[#242a38] hover:bg-[#2f3543] text-[#bbc9cf] font-headline-sm text-[14px] font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-[1.5] h-12 rounded-xl font-headline-sm text-[14px] font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-md ${
                savedSuccess
                  ? 'bg-[#48d99e] text-[#003824]'
                  : 'bg-[#00d2ff] hover:bg-[#a5e7ff] text-[#003543]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {savedSuccess ? 'check_circle' : 'save'}
              </span>
              <span>{savedSuccess ? 'Perfil Salvo!' : 'Salvar Atleta'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
