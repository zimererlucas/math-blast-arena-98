import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Star, Brain, Trophy, Gamepad2 } from 'lucide-react';
import StarField from '@/components/StarField';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Brain, title: 'Treina o Cálculo', description: 'Melhora a velocidade mental' },
    { icon: Gamepad2, title: 'Diversão Garantida', description: 'Aprende a jogar' },
    { icon: Trophy, title: 'Rankings', description: 'Compete com amigos' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden cosmic-bg">
      <StarField />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo and title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative">
              <Rocket className="w-24 h-24 text-neon-cyan rotate-45" 
                      style={{ filter: 'drop-shadow(0 0 30px hsl(190, 100%, 50%))' }} />
              <Star className="absolute -top-2 -right-2 w-8 h-8 text-neon-yellow animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 10px hsl(45, 100%, 60%))' }} />
            </div>
          </motion.div>

          <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-4">
            <span className="neon-text-cyan">Star</span>{' '}
            <span className="neon-text-magenta">Shooter</span>
          </h1>
          <p className="font-orbitron text-2xl md:text-3xl font-bold text-neon-yellow mb-2">
            Matemático
          </p>
          <p className="text-muted-foreground text-lg max-w-md mx-auto font-exo">
            Destrói naves inimigas resolvendo contas de matemática!
          </p>
        </motion.div>

        {/* Play button */}
        <motion.button
          onClick={() => navigate('/game')}
          className="group relative px-12 py-5 rounded-full btn-neon text-xl mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-3 text-primary-foreground">
            <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Jogar Agora
          </span>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-primary opacity-50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="glass-panel p-6 rounded-xl text-center border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm font-exo">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* High score display */}
        <motion.div
          className="mt-12 glass-panel px-6 py-3 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-neon-yellow" />
            <span className="font-orbitron text-sm text-muted-foreground">
              Melhor Pontuação:{' '}
              <span className="text-neon-yellow font-bold">
                {localStorage.getItem('starShooterHighScore') || '0'}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="mt-8 text-muted-foreground/50 text-sm font-exo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Curso Profissional de Técnico de Programador de Informática
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
