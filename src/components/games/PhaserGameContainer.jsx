import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { useApp } from '../../context/AppContext';
import { calculateGameScore, getAdaptiveDifficultySuggestion } from '../../utils/scoringEngine';
import { 
  X, Play, Pause, RefreshCw, Trophy, ArrowRight, ArrowLeft, 
  Home, FastForward, CheckCircle2, Sparkles, Volume2, Shield
} from 'lucide-react';

// Master Games Metadata List (Games 1 - 6)
export const GAMES_METADATA = [
  {
    id: 1,
    title: 'Remember the Sequence',
    category: 'Memory',
    num: 1,
    description: 'Memorize the order of items and reproduce the exact sequence.',
    badgeGradient: 'from-blue-600 to-indigo-700',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Family Recognition',
    category: 'Recall',
    num: 2,
    description: 'Identify your loved ones and relationships from family photos.',
    badgeGradient: 'from-cyan-600 to-blue-800',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Find the Target',
    category: 'Attention',
    num: 3,
    description: 'Locate and tap specified targets among distracting items.',
    badgeGradient: 'from-emerald-600 to-teal-800',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: 'Quick Match',
    category: 'Processing Speed',
    num: 4,
    description: 'Quickly select the matching object or card.',
    badgeGradient: 'from-purple-600 to-indigo-800',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: 'Change the Rule',
    category: 'Cognitive Flexibility',
    num: 5,
    description: 'Sort items by rules that dynamically switch mid-game.',
    badgeGradient: 'from-amber-600 to-orange-800',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    title: 'Arrange the Day',
    category: 'Planning & Sequencing',
    num: 6,
    description: 'Arrange daily routines in logical chronological order.',
    badgeGradient: 'from-teal-600 to-emerald-800',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80'
  }
];

export default function PhaserGameContainer() {
  const { 
    activeGame, setActiveGame, 
    setActiveTab,
    memoryBank, 
    addGameRecord,
    voiceSettings,
    speak 
  } = useApp();

  const gameRef = useRef(null);
  const containerRef = useRef(null);

  const [gameState, setGameState] = useState('playing'); // 'playing' | 'paused' | 'completed'
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [hitsCount, setHitsCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [scoreResult, setScoreResult] = useState(null);
  const [adaptiveResult, setAdaptiveResult] = useState(null);

  const timerRef = useRef(null);

  // Auto-read game instructions on launch
  useEffect(() => {
    if (activeGame && voiceSettings.autoRead) {
      speak(`Game ${activeGame.num || activeGame.id}: ${activeGame.title}. Category ${activeGame.category}. Level ${activeGame.level || 1}. ${activeGame.description || ''}`);
    }
  }, [activeGame]);

  // Active play time timer (Paused time is strictly EXCLUDED)
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setActiveSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // Handle Game Completion Event from Phaser Game Scene
  const handleGameComplete = (finalHits, finalMistakes, finalTotal) => {
    setGameState('completed');
    setHitsCount(finalHits);
    setMistakesCount(finalMistakes);

    const accuracy = finalTotal > 0 ? (finalHits / finalTotal) * 100 : 100;
    const scoreObj = calculateGameScore({
      accuracy,
      activeSeconds,
      expectedSeconds: 20 + ((activeGame.level || 1) * 5),
      hits: finalHits,
      totalTargets: finalTotal,
      mistakes: finalMistakes
    });

    const adaptiveObj = getAdaptiveDifficultySuggestion(scoreObj.finalScore, activeGame.level || 1, activeGame.id);

    setScoreResult(scoreObj);
    setAdaptiveResult(adaptiveObj);

    // Save result to React state & audit log
    addGameRecord({
      id: Date.now(),
      gameId: activeGame.id,
      gameName: activeGame.title,
      category: activeGame.category,
      date: new Date().toLocaleString(),
      level: activeGame.level || 1,
      score: scoreObj.finalScore,
      accuracy: Math.round(accuracy),
      activeTime: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
      suggestedLevel: adaptiveObj.suggestedLevel,
      completed: true
    });

    speak(`Game complete! Final score ${scoreObj.finalScore} points. ${adaptiveObj.message}`);
  };

  // Launch / Re-render Phaser Canvas Engine
  useEffect(() => {
    if (!activeGame || !containerRef.current) return;

    if (gameRef.current) {
      gameRef.current.destroy(true);
    }

    const config = {
      type: Phaser.AUTO,
      width: 740,
      height: 480,
      parent: containerRef.current,
      backgroundColor: '#f8fafc',
      scene: {
        create: function () {
          const scene = this;
          const currentLevel = activeGame.level || 1;
          
          // Outer Border Box
          const rect = scene.add.rectangle(370, 240, 720, 460, 0xffffff);
          rect.setStrokeStyle(3, 0x2563eb);

          // Route to exact game scene logic based on activeGame.id (1 to 6)
          if (activeGame.id === 1) renderGame1RememberSequence(scene, currentLevel);
          else if (activeGame.id === 2) renderGame2FamilyRecognition(scene, currentLevel);
          else if (activeGame.id === 3) renderGame3FindTarget(scene, currentLevel);
          else if (activeGame.id === 4) renderGame4QuickMatch(scene, currentLevel);
          else if (activeGame.id === 5) renderGame5ChangeRule(scene, currentLevel);
          else if (activeGame.id === 6) renderGame6ArrangeDay(scene, currentLevel);
        }
      }
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, [activeGame]);

  if (!activeGame) return null;

  const currentNum = activeGame.num || activeGame.id || 1;

  // --------------------------------------------------------------------------
  // GAME 1: REMEMBER THE SEQUENCE (Memory) - 5 Levels (L1: 2 items -> L5: 6 items)
  // --------------------------------------------------------------------------
  const renderGame1RememberSequence = (scene, level) => {
    const seqLength = Math.min(6, 1 + level); // L1:2, L2:3, L3:4, L4:5, L5:6
    scene.add.text(370, 35, `GAME 1: REMEMBER THE SEQUENCE (LEVEL ${level})`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '20px', color: '#0f172a', fontStyle: 'bold'
    }).setOrigin(0.5);

    const promptText = scene.add.text(370, 75, `Watch Carefully! Memorizing ${seqLength} items...`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '17px', color: '#d97706', fontStyle: 'bold'
    }).setOrigin(0.5);

    const itemsBank = ['☕ Tea', '🌺 Flower', '⛰️ Mountain', '☀️ Sun', '🍎 Apple', '⭐ Star'];
    const sequence = itemsBank.slice(0, seqLength);
    const startX = 370 - ((seqLength - 1) * 55);

    // Display sequence to player
    const cards = sequence.map((item, i) => {
      const x = startX + (i * 110);
      const box = scene.add.rectangle(x, 170, 95, 75, 0x3b82f6);
      const text = scene.add.text(x, 170, item, {
        fontFamily: 'Plus Jakarta Sans', fontSize: '15px', color: '#ffffff', fontStyle: 'bold'
      }).setOrigin(0.5);
      return { box, text };
    });

    const displayTime = Math.max(1.5, 4.5 - (level * 0.5));

    // Hide sequence and prompt player to tap in order
    scene.time.delayedCall(displayTime * 1000, () => {
      promptText.setText('Now select items in the remembered order!');
      cards.forEach(c => {
        c.box.setFillStyle(0x64748b);
        c.text.setText('❓');
      });

      let userOrder = [];
      let localMistakes = 0;
      const choices = [...sequence].sort(() => Math.random() - 0.5);

      choices.forEach((btnText, i) => {
        const x = startX + (i * 110);
        const btn = scene.add.rectangle(x, 280, 100, 48, 0x0284c7)
          .setInteractive({ useHandCursor: true });

        scene.add.text(x, 280, btnText, {
          fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);

        btn.on('pointerdown', () => {
          userOrder.push(btnText);
          const idx = userOrder.length - 1;
          if (sequence[idx] === btnText) {
            btn.setFillStyle(0x22c55e);
            if (userOrder.length === sequence.length) {
              scene.time.delayedCall(500, () => handleGameComplete(seqLength, localMistakes, seqLength));
            }
          } else {
            btn.setFillStyle(0xef4444);
            localMistakes += 1;
          }
        });
      });
    });
  };

  // --------------------------------------------------------------------------
  // GAME 2: FAMILY RECOGNITION (Recall) - 5 Levels (Uses Memory Bank Photos)
  // --------------------------------------------------------------------------
  const renderGame2FamilyRecognition = (scene, level) => {
    const familyMember = memoryBank.find(m => m.type === 'family') || {
      name: 'Rohan Sharma',
      relation: 'Grandson',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
    };

    scene.add.text(370, 35, `GAME 2: FAMILY RECOGNITION (LEVEL ${level})`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '20px', color: '#0f172a', fontStyle: 'bold'
    }).setOrigin(0.5);

    const isRelationQ = level % 2 === 1;
    const qText = isRelationQ 
      ? `How is this person related to you?` 
      : `What is this person's name?`;

    scene.add.text(370, 70, qText, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '17px', color: '#2563eb', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Render REAL Family Photo Image
    const photoKey = `fam_photo_${familyMember.id || 1}`;
    if (!scene.textures.exists(photoKey)) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = familyMember.photo;
      img.onload = () => {
        if (scene && scene.textures && !scene.textures.exists(photoKey)) {
          scene.textures.addImage(photoKey, img);
          const sprite = scene.add.sprite(370, 165, photoKey);
          sprite.setDisplaySize(180, 130);
        }
      };
    } else {
      const sprite = scene.add.sprite(370, 165, photoKey);
      sprite.setDisplaySize(180, 130);
    }

    scene.add.rectangle(370, 165, 184, 134, 0xe2e8f0).setStrokeStyle(3, 0x3b82f6).setDepth(-1);

    const correctAnswer = isRelationQ ? familyMember.relation : familyMember.name;

    let optionCount = 2; // Level 1: 2 options
    if (level === 2) optionCount = 3;
    if (level >= 3) optionCount = 4;

    const distractorsBank = isRelationQ 
      ? ['Daughter', 'Son', 'Brother', 'Sister', 'Doctor', 'Nephew']
      : ['Amit Sharma', 'Priya Devi', 'Suresh Kumar', 'Rajesh Sharma'];

    const selectedDistractors = distractorsBank.filter(d => d !== correctAnswer).slice(0, optionCount - 1);
    const options = [correctAnswer, ...selectedDistractors].sort(() => Math.random() - 0.5);

    let localMistakes = 0;

    options.forEach((opt, idx) => {
      const isFour = options.length >= 4;
      const col = idx % (isFour ? 2 : 3);
      const row = Math.floor(idx / (isFour ? 2 : 3));
      const x = isFour ? (260 + col * 220) : (220 + col * 150);
      const y = 270 + row * 55;
      const width = isFour ? 190 : 140;

      const btn = scene.add.rectangle(x, y, width, 46, 0xe2e8f0)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(2, 0x94a3b8);

      const label = scene.add.text(x, y, opt, {
        fontFamily: 'Plus Jakarta Sans', fontSize: '15px', color: '#0f172a', fontStyle: 'bold'
      }).setOrigin(0.5);

      btn.on('pointerdown', () => {
        if (opt === correctAnswer) {
          btn.setFillStyle(0x22c55e);
          label.setColor('#ffffff');
          scene.time.delayedCall(500, () => handleGameComplete(1, localMistakes, 1));
        } else {
          btn.setFillStyle(0xef4444);
          label.setColor('#ffffff');
          localMistakes += 1;
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // GAME 3: FIND THE TARGET (Attention) - 5 Levels
  // --------------------------------------------------------------------------
  const renderGame3FindTarget = (scene, level) => {
    let objectCount = 4; // L1: 4 objects
    let targetCount = 1; // L1: 1 target
    if (level === 2) { objectCount = 6; targetCount = 1; }
    if (level === 3) { objectCount = 8; targetCount = 1; }
    if (level === 4) { objectCount = 10; targetCount = 2; }
    if (level === 5) { objectCount = 12; targetCount = 2; }

    scene.add.text(370, 35, `GAME 3: FIND THE TARGET (LEVEL ${level})`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '20px', color: '#0f172a', fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(370, 70, `Tap all GREEN CIRCLES (Find = ${targetCount}):`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '17px', color: '#2563eb', fontStyle: 'bold'
    }).setOrigin(0.5);

    let hits = 0;
    let mistakes = 0;
    const items = [];

    for (let i = 0; i < objectCount; i++) {
      const isTarget = i < targetCount;
      const col = i % 4;
      const row = Math.floor(i / 4);
      items.push({
        type: isTarget ? 'target' : 'distractor',
        color: isTarget ? 0x22c55e : [0xef4444, 0x3b82f6, 0xf59e0b, 0x8b5cf6][i % 4],
        x: 180 + col * 130,
        y: 140 + row * 90
      });
    }

    items.sort(() => Math.random() - 0.5);

    items.forEach((s) => {
      const circle = scene.add.circle(s.x, s.y, 34, s.color)
        .setInteractive({ useHandCursor: true });

      circle.on('pointerdown', () => {
        if (s.type === 'target') {
          circle.setStrokeStyle(4, 0xffffff);
          hits += 1;
          if (hits >= targetCount) {
            scene.time.delayedCall(500, () => handleGameComplete(hits, mistakes, targetCount));
          }
        } else {
          circle.setFillStyle(0x64748b);
          mistakes += 1;
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // GAME 4: QUICK MATCH (Processing Speed) - 5 Levels
  // --------------------------------------------------------------------------
  const renderGame4QuickMatch = (scene, level) => {
    let cardCount = 4; // L1: 4 cards
    if (level === 2) cardCount = 6;
    if (level === 3) cardCount = 8;
    if (level === 4) cardCount = 10;
    if (level === 5) cardCount = 12;

    scene.add.text(370, 35, `GAME 4: QUICK MATCH (LEVEL ${level})`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '20px', color: '#0f172a', fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(370, 70, `Tap the card that MATCHES the target item:`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '17px', color: '#059669', fontStyle: 'bold'
    }).setOrigin(0.5);

    const targetItem = '🦏 Kaziranga Rhino';

    // Target Box
    scene.add.rectangle(370, 140, 180, 55, 0x10b981);
    scene.add.text(370, 140, targetItem, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '16px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    const distractorPool = ['🌺 Flower', '⛰️ Mountain', '☕ Tea Cup', '☀️ Sun', '🍎 Apple', '⭐ Star', '🌊 Lake', '🌲 Tree'];
    const selectedDistractors = distractorPool.slice(0, cardCount - 1);
    const cards = [targetItem, ...selectedDistractors].sort(() => Math.random() - 0.5);

    let localMistakes = 0;

    cards.forEach((cardText, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const x = 180 + col * 130;
      const y = 230 + row * 65;

      const btn = scene.add.rectangle(x, y, 115, 50, 0xe2e8f0)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(2, 0x94a3b8);

      const label = scene.add.text(x, y, cardText, {
        fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#0f172a', fontStyle: 'bold'
      }).setOrigin(0.5);

      btn.on('pointerdown', () => {
        if (cardText === targetItem) {
          btn.setFillStyle(0x22c55e);
          label.setColor('#ffffff');
          scene.time.delayedCall(500, () => handleGameComplete(1, localMistakes, 1));
        } else {
          btn.setFillStyle(0xef4444);
          label.setColor('#ffffff');
          localMistakes += 1;
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // GAME 5: CHANGE THE RULE (Cognitive Flexibility) - 5 Levels
  // --------------------------------------------------------------------------
  const renderGame5ChangeRule = (scene, level) => {
    let objectCount = 4; // L1: 4 objects, 1 rule
    let switchCount = 1;
    if (level === 2) { objectCount = 6; switchCount = 2; }
    if (level === 3) { objectCount = 8; switchCount = 2; }
    if (level === 4) { objectCount = 10; switchCount = 2; }
    if (level === 5) { objectCount = 12; switchCount = 3; }

    scene.add.text(370, 35, `GAME 5: CHANGE THE RULE (LEVEL ${level})`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '20px', color: '#0f172a', fontStyle: 'bold'
    }).setOrigin(0.5);

    const ruleText = scene.add.text(370, 75, 'RULE 1: Sort by BLUE color!', {
      fontFamily: 'Plus Jakarta Sans', fontSize: '18px', color: '#2563eb', fontStyle: 'bold'
    }).setOrigin(0.5);

    let currentRule = 1;
    let hits = 0;
    let mistakes = 0;

    const shapes = [
      { color: 0x3b82f6, type: 'circle', x: 230, y: 180 },
      { color: 0x22c55e, type: 'circle', x: 370, y: 180 },
      { color: 0x3b82f6, type: 'square', x: 510, y: 180 },
      { color: 0xef4444, type: 'square', x: 230, y: 280 },
      { color: 0x3b82f6, type: 'triangle', x: 370, y: 280 },
      { color: 0x22c55e, type: 'triangle', x: 510, y: 280 }
    ].slice(0, objectCount);

    shapes.forEach((s) => {
      const obj = scene.add.circle(s.x, s.y, 36, s.color)
        .setInteractive({ useHandCursor: true });

      obj.on('pointerdown', () => {
        let isCorrect = false;
        if (currentRule === 1 && s.color === 0x3b82f6) isCorrect = true;
        if (currentRule === 2 && s.type === 'circle') isCorrect = true;
        if (currentRule === 3 && s.color === 0x22c55e) isCorrect = true;

        if (isCorrect) {
          obj.setStrokeStyle(4, 0xffffff);
          hits += 1;

          if (hits === 1 && switchCount >= 2 && currentRule === 1) {
            currentRule = 2;
            ruleText.setText('⚡ RULE CHANGED: Now sort by CIRCLE shape!');
            ruleText.setColor('#d97706');
          } else if (hits === 2 && switchCount >= 3 && currentRule === 2) {
            currentRule = 3;
            ruleText.setText('⚡ RULE CHANGED: Now sort by GREEN color!');
            ruleText.setColor('#059669');
          } else if (hits >= switchCount) {
            scene.time.delayedCall(500, () => handleGameComplete(hits, mistakes, switchCount));
          }
        } else {
          obj.setFillStyle(0x64748b);
          mistakes += 1;
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // GAME 6: ARRANGE THE DAY (Planning & Sequencing) - 5 Levels
  // --------------------------------------------------------------------------
  const renderGame6ArrangeDay = (scene, level) => {
    let activityCount = 3; // L1: 3 activities
    if (level === 2) activityCount = 4;
    if (level === 3) activityCount = 5;
    if (level === 4) activityCount = 6;
    if (level === 5) activityCount = 7;

    const fullRoutines = [
      '1. Morning Tea ☕',
      '2. Park Walk 🚶‍♂️',
      '3. Lunch 🍲',
      '4. Afternoon Nap 😴',
      '5. Family Call 📞',
      '6. Evening Dinner 🥗',
      '7. Night Sleep 🌙'
    ];

    const correctOrder = fullRoutines.slice(0, activityCount);
    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

    scene.add.text(370, 35, `GAME 6: ARRANGE THE DAY (LEVEL ${level})`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '20px', color: '#0f172a', fontStyle: 'bold'
    }).setOrigin(0.5);

    scene.add.text(370, 70, `Arrange activities in chronological order (Morning ➔ Night):`, {
      fontFamily: 'Plus Jakarta Sans', fontSize: '15px', color: '#334155'
    }).setOrigin(0.5);

    let step = 0;
    let mistakes = 0;

    shuffled.forEach((act, idx) => {
      const y = 115 + idx * 48;
      const btn = scene.add.rectangle(370, y, 320, 42, 0xf1f5f9)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(2, 0xcbd5e1);

      const text = scene.add.text(370, y, act, {
        fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#0f172a', fontStyle: 'bold'
      }).setOrigin(0.5);

      btn.on('pointerdown', () => {
        if (act === correctOrder[step]) {
          btn.setFillStyle(0x22c55e);
          text.setColor('#ffffff');
          step += 1;
          if (step === correctOrder.length) {
            scene.time.delayedCall(500, () => handleGameComplete(activityCount, mistakes, activityCount));
          }
        } else {
          btn.setFillStyle(0xef4444);
          text.setColor('#ffffff');
          mistakes += 1;
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // GAME NAVIGATION HELPERS (Next Game / Previous Game / Retry / Home / Try Level)
  // --------------------------------------------------------------------------
  
  // Navigate to Next Game (Disabled on Game 6)
  const handleNextGame = () => {
    const nextGameObj = GAMES_METADATA.find(g => g.id === currentNum + 1);
    if (nextGameObj) {
      setActiveGame({
        ...nextGameObj,
        level: activeGame.level || 1
      });
      setGameState('playing');
      setActiveSeconds(0);
      setScoreResult(null);
      setAdaptiveResult(null);
    }
  };

  // Navigate to Previous Game (Disabled on Game 1)
  const handlePreviousGame = () => {
    const prevGameObj = GAMES_METADATA.find(g => g.id === currentNum - 1);
    if (prevGameObj) {
      setActiveGame({
        ...prevGameObj,
        level: activeGame.level || 1
      });
      setGameState('playing');
      setActiveSeconds(0);
      setScoreResult(null);
      setAdaptiveResult(null);
    }
  };

  // Restart current game at same level
  const handleRetry = () => {
    setGameState('playing');
    setActiveSeconds(0);
    setScoreResult(null);
    setAdaptiveResult(null);
  };

  // Try Suggested Level (From Recommendation Engine)
  const handleTrySuggestedLevel = (sugLevel) => {
    setActiveGame({
      ...activeGame,
      level: sugLevel
    });
    setGameState('playing');
    setActiveSeconds(0);
    setScoreResult(null);
    setAdaptiveResult(null);
  };

  // Return to 6 Cognitive Games Dashboard
  const handleReturnHome = () => {
    setActiveGame(null);
    setActiveTab('games');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Top Game Navigation Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1 bg-blue-600 font-black text-xs rounded-full">
              Level {activeGame.level || 1}
            </span>
            <div>
              <h2 className="text-xl font-extrabold">{currentNum}. {activeGame.title}</h2>
              <span className="text-xs text-slate-400 font-semibold">{activeGame.category}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Timer Display (Active Time Excluding Pauses) */}
            <div className="px-4 py-1.5 bg-slate-800 rounded-xl font-mono text-emerald-400 font-bold text-sm">
              ⏱️ {Math.floor(activeSeconds / 60)}:{(activeSeconds % 60).toString().padStart(2, '0')}
            </div>

            {/* Pause Button */}
            <button
              onClick={() => setGameState('paused')}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-white"
              title="Pause Game"
            >
              <Pause className="w-5 h-5" />
            </button>

            {/* Home / Close Button */}
            <button
              onClick={handleReturnHome}
              className="p-2.5 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white"
              title="Return to Games Dashboard"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Canvas Body Container */}
        <div className="p-6 bg-slate-100 flex items-center justify-center relative min-h-[500px]">
          
          {/* PAUSE OVERLAY MENU (Stops Timer & Gameplay Immediately) */}
          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-black">GAME PAUSED</h3>
                <p className="text-sm text-slate-300 font-medium">Timer paused. Your progress is saved right here.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-6">
                <button
                  onClick={() => setGameState('playing')}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg flex items-center justify-center space-x-2 text-base"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Resume</span>
                </button>

                <button
                  onClick={handleRetry}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Retry</span>
                </button>

                <button
                  onClick={handleReturnHome}
                  className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-base"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </button>
              </div>
            </div>
          )}

          {/* Phaser HTML5 Canvas Mount Point */}
          <div ref={containerRef} className="rounded-2xl overflow-hidden shadow-inner border border-slate-300"></div>
        </div>

        {/* GAME RESULT SCREEN (Final Score, Accuracy, Hits, Mistakes, Next/Prev/Retry/Home Navigation) */}
        {gameState === 'completed' && scoreResult && (
          <div className="absolute inset-0 z-40 bg-slate-900/90 backdrop-blur-md p-6 flex items-center justify-center animate-fadeIn">
            <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl border border-slate-200 text-center space-y-6">
              
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-900">Game Complete!</h3>
                <div className="text-4xl font-black text-blue-600 mt-2">
                  {scoreResult.finalScore}% <span className="text-base font-bold text-slate-400">Score</span>
                </div>
              </div>

              {/* Game Performance Statistics Summary */}
              <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-800">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Accuracy</div>
                  <div className="text-lg font-black text-slate-900">{scoreResult.components.A}%</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Hits</div>
                  <div className="text-lg font-black text-emerald-600">{hitsCount}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Mistakes</div>
                  <div className="text-lg font-black text-red-600">{mistakesCount}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Active Time</div>
                  <div className="text-lg font-black text-slate-900">{Math.floor(activeSeconds / 60)}m {activeSeconds % 60}s</div>
                </div>
              </div>

              {/* Rule-Based Level Suggestion Box */}
              {adaptiveResult && (
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-blue-800 tracking-wide flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Level Suggestion Engine</span>
                    </span>
                    {adaptiveResult.canChange && (
                      <button
                        onClick={() => handleTrySuggestedLevel(adaptiveResult.suggestedLevel)}
                        className="px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow"
                      >
                        Try Level {adaptiveResult.suggestedLevel}
                      </button>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-blue-950 leading-snug">
                    {adaptiveResult.message}
                  </p>
                </div>
              )}

              {/* RESULT SCREEN ACTION BUTTONS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                
                {/* Retry Button */}
                <button
                  onClick={handleRetry}
                  className="py-3.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold rounded-2xl text-xs flex items-center justify-center space-x-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>RETRY</span>
                </button>

                {/* Previous Game (Disabled on Game 1) */}
                <button
                  onClick={handlePreviousGame}
                  disabled={currentNum <= 1}
                  className={`py-3.5 px-3 font-extrabold rounded-2xl text-xs flex items-center justify-center space-x-1.5 ${
                    currentNum <= 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>PREV GAME</span>
                </button>

                {/* Next Game (Disabled on Game 6) */}
                <button
                  onClick={handleNextGame}
                  disabled={currentNum >= 6}
                  className={`py-3.5 px-3 font-extrabold rounded-2xl text-xs flex items-center justify-center space-x-1.5 ${
                    currentNum >= 6
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                  }`}
                >
                  <span>NEXT GAME</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Home Button */}
                <button
                  onClick={handleReturnHome}
                  className="py-3.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center space-x-1.5"
                >
                  <Home className="w-4 h-4" />
                  <span>HOME</span>
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
