export const defaultText = 
`---
DiscourseUnit: 
  VisualDictionary:
    - Fragment: 
        Simple noun phrase:
        noun: 
          דבר 
          theme
    - Fragment: 
        Modified noun phrase:
          Nominal:
            noun: 
              דבר 
              theme
            adjective: 
              טוב 
              noble
    - Fragment: 
        Definite noun phrase:
          Nominal:
            article: 
              ה 
              the
            noun: 
              דבר 
              theme
    - Fragment: 
        Definite modified noun phrase:
          Nominal:
            article: 
              ה 
              the
            noun: 
              דבר 
              theme
          Adjectival:
            article: 
              ה 
              the
            adjective: 
              טוב 
              noble
    - Fragment: 
        Substantival adjective:
          Nominal:
            adjective: 
              טוב 
              noble
    - Fragment: 
        Substantival definite adjective:
          Nominal:
            article: 
              ה 
              the
            adjective: 
              טוב 
              noble
    - Fragment: 
        Quantifier with simple noun:
          Nominal:
            quantifier: 
              כל 
              all
            noun: 
              עבדים 
              servants
    - Fragment: 
        Quantifier with a construct chain:
          Nominal:
            quantifier: 
              כל 
              all
            ConstructChain:
              - noun: 
                  עבדים 
                  servants
              - noun: 
                  יהוה 
                  YHWH
    - Fragment: 
        Quantifier with a construct chain and modifier:
          Nominal:
            quantifier: 
              כל 
              all
            ConstructChain:
              Nominal:
                noun: 
                  עבדים 
                  servants
                Adjectival:
                  verb-participle: 
                    עמדים 
                    standing
              noun: 
                יהוה 
                YHWH
    - Fragment: 
        Quantifier with a definite construct chain and modifier:
          Nominal:
            quantifier: 
              כל 
              all
            ConstructChain:
              Nominal:
                noun: 
                  עבדים 
                  servants
                Adjectival:
                  article: 
                    ה 
                    the
                  verb-participle: 
                    עמדים 
                    standing
              noun: 
                יהוה 
                YHWH
`;