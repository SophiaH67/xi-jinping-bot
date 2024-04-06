using Catalyst;
using Mosaik.Core;
using xi_jinping_backend.Utils;

namespace xi_jinping_backend.Rules;

enum Vibe
{
  POSITIVE,
  NEGATIVE,
  NEUTRAL
}

public class GoodChinaRule : Rule
{
  private readonly Pipeline nlp;

  public GoodChinaRule()
  {
    Catalyst.Models.English.Register();
    Storage.Current = new DiskStorage("catalyst-models");
    nlp = Pipeline.For(Language.English);


  }
  public override Task<(string[], int)> Check(RuleArgs args)
  {
    int score = 0;

    var document = new Document(args.message, Language.English);

    nlp.ProcessSingle(document);

    foreach (List<TokenData> sentenceTokenList in document.TokensData)
    {
      TokenData firstToken = sentenceTokenList.First();
      TokenData lastToken = sentenceTokenList.Last();
      string sentence = args.message.Substring(firstToken.LowerBound, lastToken.UpperBound - firstToken.LowerBound);
      var (vibe, intensity) = VibeCheck(sentence);

      foreach (TokenData token in sentenceTokenList)
      {
        if (token.Tag == PartOfSpeech.NOUN)
        {
          var noun = args.message.Substring(token.LowerBound, token.UpperBound - token.LowerBound);
          Vibe nounVibe = GetNounVibe(noun);

          Vibe overallVibe;
          if (nounVibe == Vibe.NEUTRAL)
          {
            overallVibe = Vibe.NEUTRAL;
          }
          else if (nounVibe == Vibe.POSITIVE && vibe == Vibe.POSITIVE)
          {
            overallVibe = Vibe.POSITIVE;
          }
          else if (nounVibe == Vibe.NEGATIVE && vibe == Vibe.NEGATIVE)
          {
            overallVibe = Vibe.POSITIVE;
          }
          else if (nounVibe == Vibe.POSITIVE && vibe == Vibe.NEGATIVE)
          {
            overallVibe = Vibe.NEGATIVE;
          }
          else if (nounVibe == Vibe.NEGATIVE && vibe == Vibe.POSITIVE)
          {
            overallVibe = Vibe.NEGATIVE;
          }
          else
          {
            Console.WriteLine("Noun vibe: " + nounVibe + " Sentence vibe: " + vibe);
            throw new Exception("This should never happen");
          }

          switch (overallVibe)
          {
            case Vibe.POSITIVE:
              score += Convert.ToInt32(intensity * 40 - 10); // -10 because we want people to be overtly positive
              break;
            case Vibe.NEGATIVE:
              score -= Convert.ToInt32(intensity * 40);
              break;
            case Vibe.NEUTRAL:
              break;
          }
        }
      }
    }

    if (score < 0)
    {
      return Task.FromResult((new string[] { "不要谈论那些事情！" }, score));
    }

    if (score > 0)
    {
      return Task.FromResult((new string[] { "是的！ 继续谈论那些美好的事情！" }, score));
    }

    return Task.FromResult(EmptyResponse);
  }

  private (Vibe, double) VibeCheck(string sentence)
  {
    return (Vibe.POSITIVE, 1.0);
  }

  private Vibe GetNounVibe(string noun)
  {
    return Vibe.NEUTRAL;
  }
}
