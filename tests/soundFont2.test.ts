import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { SoundFont3 } from '../src';
import { ParseError } from '../src/riff';

const readFile = promisify(fs.readFile);
let soundFont: SoundFont3;

beforeAll(async () => {
  const buffer = await readFile(path.join(__dirname, 'fonts/valid.sf2'));
  soundFont = SoundFont3.from(buffer);
});

describe('SoundFont3', () => {
  it('should not parse invalid SoundFonts', async () => {
    const buffer = await readFile(path.join(__dirname, 'fonts/invalid.sf2'));
    expect(() => new SoundFont3(buffer)).toThrow(ParseError);
  });

  it('should parse metadata', () => {
    const metaData = soundFont.metaData;
    expect(metaData.product).toBe('Jest');
    expect(metaData.copyright).toBe('Copyright (c) Maarten Zuidhoorn');
    expect(metaData.comments).toBe('This SoundFont is made for testing purposes.');
    expect(metaData.soundEngine).toBe('EMU8000');
    expect(metaData.createdBy).toBe('Polyphone');
  });
});
