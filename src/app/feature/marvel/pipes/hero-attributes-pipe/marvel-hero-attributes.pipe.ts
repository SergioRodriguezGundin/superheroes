import { Pipe, PipeTransform } from '@angular/core';
import { Citizenship, Gender, HeroAttributeType, MarvelHeroType, MemberOf, Occupation, Skill } from '../../interfaces/hero.interface';

interface HeroPropertiePipeConfig {
  label: string;
  backgroundColor: string;
  emoji: string;
}

@Pipe({
  name: 'heroAttribute',
  standalone: true
})
export class HeroAttributePipe implements PipeTransform {
  private colors = ['#FFC107', '#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];

  transform(heroAttribute: HeroAttributeType = '', property: MarvelHeroType): HeroPropertiePipeConfig {
    const propertyConfig = {
      id: this.getIdProperties(heroAttribute),
      citizenshipLabel: this.getCitizenshipProperties(heroAttribute as Citizenship),
      occupationLabel: this.getOccupationProperties(heroAttribute as Occupation),
      genderLabel: this.getGenderProperties(heroAttribute as Gender),
      skillsLabel: this.getSkillsProperties(heroAttribute as Skill),
      memberOfLabel: this.getMemberOfProperties(heroAttribute as MemberOf),
      nameLabel: this.getNameProperties(heroAttribute),
      creatorLabel: this.creatorProperties(heroAttribute)
    };

    const config = propertyConfig[property] || {
      label: heroAttribute,
      backgroundColor: '#9E9E9E',
      emoji: '❓'
    };

    return config;
  }

  private getColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  private getIdProperties(id: string): HeroPropertiePipeConfig {
    return {
      label: id,
      backgroundColor: this.getColor(),
      emoji: '🆔'
    };
  }

  private creatorProperties(creator: string): HeroPropertiePipeConfig {
    return {
      label: creator,
      backgroundColor: this.getColor(),
      emoji: '🖋️'
    };
  }

  private getNameProperties(name: string): HeroPropertiePipeConfig {
    return {
      label: name,
      backgroundColor: this.getColor(),
      emoji: this.getNameEmoji(name)
    };
  }

  private getMemberOfProperties(memberOf: MemberOf): HeroPropertiePipeConfig {
    return {
      label: memberOf,
      backgroundColor: this.getColor(),
      emoji: this.getMemberOfEmoji(memberOf)
    };
  }

  private getSkillsProperties(skills: Skill): HeroPropertiePipeConfig {
    return {
      label: skills,
      backgroundColor: this.getColor(),
      emoji: this.getSkillsEmoji(skills)
    };
  }

  private getCitizenshipProperties(citizenship: Citizenship): HeroPropertiePipeConfig {
    return {
      label: citizenship,
      backgroundColor: this.getColor(),
      emoji: this.getCitizenshipEmoji(citizenship)
    };
  }

  private getOccupationProperties(occupation: Occupation): HeroPropertiePipeConfig {
    return {
      label: occupation,
      backgroundColor: this.getColor(),
      emoji: this.getOccupationEmoji(occupation)
    }
  }

  private getGenderProperties(gender: Gender): HeroPropertiePipeConfig {
    return {
      label: gender,
      backgroundColor: this.getColor(),
      emoji: this.getGenderEmoji(gender)
    }
  }

  private getMemberOfEmoji(memberOf: MemberOf): string {
    switch (memberOf) {
      case MemberOf.HorsemenOfApocalypse:
        return '🐎';
      case MemberOf.TheSpiderSociety:
        return '🕷️';
      case MemberOf.Interpol:
        return '🕵️';
      case MemberOf.NewWarriors:
        return '🛡️';
      case MemberOf.Defenders:
        return '🦸‍♀️';
      case MemberOf.TheAvengers:
        return '🦸‍♀️';
      case MemberOf.BrotherhoodOfMutants:
        return '🦹‍♂️';
      case MemberOf.UnitedStatesArmy:
        return '🇺🇸';
      case MemberOf.Illuminati:
        return '🔺';
      case MemberOf.HellfireClub:
        return '🔥';
      default:
        return '❓';
    }
  }

  private getSkillsEmoji(skills: Skill): string {
    switch (skills) {
      case Skill.SuperhumanStrength:
        return '💪';
      case Skill.Telepathy:
        return '🧠';
      case Skill.SuperhumanAgilityReflexes:
        return '🤸';
      case Skill.EnergyBlasts:
        return '💥';
      case Skill.HealingFactor:
        return '🩹';
      case Skill.Levitation:
        return '🕊️';
      case Skill.Photokinesis:
        return '✨';
      case Skill.Precognition:
        return '👁️';
      case Skill.Shapeshifting:
        return '🐯';
      case Skill.TeleportationInFiction:
        return '⚡';
      case Skill.WeatherManipulation:
        return '⛈️';
      case Skill.Retrocognition:
        return '🕰️';
      case Skill.SonicScream:
        return '🔊';
      default:
        return '❓';
    }
  }

  private getGenderEmoji(gender: Gender): string {
    if (gender === Gender.Male) {
      return '🦸🏻‍♂️';
    }
    if (gender === Gender.Female) {
      return '🦸🏻‍♀️';
    }
    return '🦸🏼‍♂️';
  }

  private getNameEmoji(name: string): string {
    return '🌟';
  }

  private getCitizenshipEmoji(citizenship: Citizenship): string {
    switch (citizenship) {
      case Citizenship.UnitedStatesOfAmerica:
        return '🇺🇸';
      case Citizenship.Ireland:
        return '🇮🇪';
      case Citizenship.Wakanda:
        return '🇼🇫';
      case Citizenship.Canada:
        return '🇨🇦';
      case Citizenship.PrincipalityOfWallachia:
        return '🇷🇴';
      case Citizenship.UnitedKingdom:
        return '🇬🇧';
      case Citizenship.Russia:
        return '🇷🇺';
      case Citizenship.Egypt:
        return '🇪🇬';
      default:
        return '❓';
    }
  }

  private getOccupationEmoji(occupation: Occupation): string {
    switch (occupation) {
      case Occupation.Psychologist:
        return '🧠';
      case Occupation.Student:
        return '🎓';
      case Occupation.Criminal:
        return '🔫';
      case Occupation.Scientist:
        return '🔬';
      case Occupation.Writer:
        return '✍️';
      case Occupation.Superhero:
        return '🦸‍♀️';
      case Occupation.Soldier:
        return '🪖';
      case Occupation.Teacher:
        return '🏫';
      case Occupation.FictionalSoldier:
        return '🔍';
      case Occupation.Sovereign:
        return '👑';
      case Occupation.Businessperson:
        return '💼';
      case Occupation.CircusPerformer:
        return '🎪';
      case Occupation.Leader:
        return '🏆';
      case Occupation.Reporter:
        return '📰';
      case Occupation.Actor:
        return '🎬';
      case Occupation.Mercenary:
        return '🗡️';
      case Occupation.DomesticWorker:
        return '🧹';
      case Occupation.Physician:
        return '🩺';
      case Occupation.Gangster:
        return '🤵';
      case Occupation.Astronaut:
        return '🚀';
      default:
        return '❓';
    }
  }
}
