import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const features = [
  {
    icon: '⚡',
    title: 'Developer Profiles',
    desc: 'Showcase your skills, experience, and open-source projects in one place.'
  },
  {
    icon: '🤝',
    title: 'Global Network',
    desc: 'Connect with developers who share your stack, interests, and ambitions.'
  },
  {
    icon: '💬',
    title: 'Community Posts',
    desc: 'Share knowledge, ask questions, and grow alongside your peers.'
  }
];

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* ── Ambient gradient orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-48 -left-48 w-[480px] h-[480px] bg-purple-700 rounded-full blur-[130px] opacity-25 animate-pulse-glow" />
        <div className="absolute top-1/3 -right-48 w-[560px] h-[560px] bg-blue-700 rounded-full blur-[150px] opacity-20 animate-pulse-glow-slow" />
        <div
          className="absolute -bottom-32 left-1/3 w-[380px] h-[380px] bg-indigo-600 rounded-full blur-[110px] opacity-20 animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* ── Hero ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-32 pb-20 text-center">
        {/* Status badge */}
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 backdrop-blur-sm mb-10 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            The professional network for developers
          </span>
        </div>

        {/* Headline */}
        <h1
          className="opacity-0 animate-slide-up max-w-4xl text-5xl sm:text-6xl md:text-[72px] font-bold tracking-tight leading-[1.05] text-white mb-6"
          style={{ animationFillMode: 'forwards' }}
        >
          Connect.&nbsp;Build. <span className="text-gradient">Inspire.</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="opacity-0 animate-slide-up-1 max-w-lg text-base sm:text-lg text-white/45 leading-relaxed mb-12"
          style={{ animationFillMode: 'forwards' }}
        >
          Build your developer profile, collaborate on projects, share what you
          know, and get discovered by teams building things that matter.
        </p>

        {/* CTA buttons */}
        <div
          className="opacity-0 animate-slide-up-2 flex flex-col sm:flex-row items-center gap-4"
          style={{ animationFillMode: 'forwards' }}
        >
          <Link
            to="/register"
            className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
          >
            Get started — it's free
          </Link>
          <Link
            to="/login"
            className="px-8 py-3.5 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Sign in
          </Link>
        </div>

        {/* Divider */}
        <div
          className="opacity-0 animate-slide-up-2 mt-20 w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"
          style={{ animationFillMode: 'forwards' }}
        />

        {/* Feature cards */}
        <div
          className="opacity-0 animate-slide-up-3 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl w-full"
          style={{ animationFillMode: 'forwards' }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm text-left hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300 cursor-default"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-white/90 font-semibold text-sm mb-1.5 group-hover:text-white transition-colors">
                {f.title}
              </h3>
              <p className="text-white/35 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div className="relative z-10 border-t border-white/[0.06] py-6 px-6 flex items-center justify-center">
        <p className="text-white/20 text-xs tracking-wide">
          WorkPlace &copy; {new Date().getFullYear()} &mdash; Built for
          developers
        </p>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
