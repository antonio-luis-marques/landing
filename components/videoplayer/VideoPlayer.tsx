'use client';

import { Card, CardContent, Typography } from '@mui/material';

export interface YouTubePlayerProps {
  youtubeUrl: string;
  title?: string;
}

export default function YouTubePlayer({
  youtubeUrl,
  title = 'YouTube Video',
}: YouTubePlayerProps) {
  const embedUrl = youtubeUrl.replace('watch?v=', 'embed/');

  return (
    <Card
      sx={{
        width: {
          xs: '100%',     // 100% em telas pequenas
          sm: '100%',
          md: 400,        // 400px a partir de telas médias
        },
        minWidth: {
          xs: '100%',
          md: 320,        // largura mínima para manter legibilidade
        },
        maxWidth: 500,
        borderRadius: 3,
        boxShadow: 5,
        backgroundColor: '#111',
        flexShrink: 0, // evita encolher se estiver em container com flex
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
